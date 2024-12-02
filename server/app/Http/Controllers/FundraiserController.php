<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FundraiserController extends Controller
{
    public function createFundraiser(Request $request)
    {
        $user = $request->user();
        Log::info('Creating fundraiser for user', ['user_id' => $user->id]);
    
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'totalAmount' => 'required|numeric',
            'category' => 'required|string',
            'status' => 'required|string',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
        ]);
    
        Log::info('Validated input data', $validated);
    
        try {
            $sql = "INSERT INTO fundraiser (user_id, title, description, image, totalAmount, amountRaised, category, status, firstName, lastName, email, phone, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $fundraiserId = DB::insert($sql, [
                $user->id,
                $validated['title'],
                $validated['description'],
                $validated['image'],
                $validated['totalAmount'],
                0, 
                $validated['category'],
                $validated['status'],
                $validated['firstName'],
                $validated['lastName'],
                $validated['email'],
                $validated['phone'],
                now(),
                now()
            ]);

            $fundraiserId = DB::getPdo()->lastInsertId(); 
            Log::info('Fundraiser created successfully', ['fundraiser_id' => $fundraiserId]);
    
            $fundraiser = DB::selectOne("SELECT * FROM fundraiser WHERE id = ?", [$fundraiserId]);
            Log::info('Fetched fundraiser details', ['fundraiser' => $fundraiser]);

            $donations = DB::table('donation')->where('fundraiser_id', $fundraiserId)->get();
            Log::info('Fetched related donations', ['donations' => $donations]);
        
            $fundraiserWithDetails = $this->attachUserDetailsAndDonations($fundraiser, $donations);
            Log::info('Fundraiser data with user details and donations', ['fundraiser' => $fundraiserWithDetails]);
    
            return response()->json(['fundraiser' => $fundraiserWithDetails], 201);
    
        } catch (\Exception $e) {
            Log::error('Error creating fundraiser', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error creating fundraiser'], 500);
        }
    }

    public function getAllFundraisers()
    {
        $fundraisers = DB::select("SELECT * FROM fundraiser");

        $fundraisers = array_map(function ($fundraiser) {
            $donations = DB::table('donation')
                ->where('fundraiser_id', $fundraiser->id)
                ->get();
            return $this->attachUserDetailsAndDonations($fundraiser, $donations);
        }, $fundraisers);

        return response()->json(data: ['fundraisers' => $fundraisers]);
    }

    public function getFundraisersByUser(Request $request)
{
    $userId = $request->user()->id;

    $fundraisers = DB::select("
        SELECT DISTINCT f.* 
        FROM fundraiser f
        JOIN donation d ON f.id = d.fundraiser_id
        WHERE d.user_id = ? 
    ", [$userId]);

    $fundraisers = array_map(function ($fundraiser) use ($userId) {
        $donations = DB::table('donation')
            ->where('fundraiser_id', $fundraiser->id)
            ->where('user_id', $userId)
            ->get();
        return $this->attachUserDetailsAndDonations($fundraiser, $donations);
    }, $fundraisers);

    return response()->json(['fundraisers' => $fundraisers]);
}

    public function getFundraiser($id)
    {
        $fundraiser = DB::selectOne("SELECT * FROM fundraiser WHERE id = ?", [$id]);

        if (!$fundraiser) {
            return response()->json(['message' => 'Fundraiser not found'], 404);
        }

        $donations = DB::table('donation')
            ->where('fundraiser_id', $id)
            ->get();

        return response()->json(['fundraiser' => $this->attachUserDetailsAndDonations($fundraiser, $donations)]);
    }

    public function updateFundraiser(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'image' => 'sometimes|string',
            'totalAmount' => 'sometimes|numeric',
            'category' => 'sometimes|string',
            'status' => 'sometimes|string',
            'amountRaised' => 'sometimes|numeric',
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'sometimes|string|max:20',
        ]);
    
        $setClause = [];
        $values = [];
        foreach ($validated as $key => $value) {
            $setClause[] = "$key = ?";
            $values[] = $value;
        }
    
        $setClause[] = "updated_at = ?";
        $values[] = now(); 
    
        $sql = "UPDATE fundraiser SET " . implode(', ', $setClause) . " WHERE id = ?";
        $values[] = $id; 
    
        $updated = DB::update($sql, $values);
    
        if (!$updated) {
            return response()->json(['message' => 'Fundraiser not found'], 404);
        }
    
        $fundraiser = DB::selectOne("SELECT * FROM fundraiser WHERE id = ?", [$id]);
    
        $donations = DB::table('donation')
            ->where('fundraiser_id', $id)
            ->get();
    
        return response()->json(['fundraiser' => $this->attachUserDetailsAndDonations($fundraiser, $donations)]);
    }
    
    public function deleteFundraiser($id)
    {
        $deleted = DB::delete("DELETE FROM fundraiser WHERE id = ?", [$id]);

        if (!$deleted) {
            return response()->json(['message' => 'Fundraiser not found'], 404);
        }

        return response()->json(['message' => 'Fundraiser deleted successfully']);
    }

    private function attachUserDetailsAndDonations($fundraiser, $donations)
    {
        $user = DB::table('users')->where('id', $fundraiser->user_id)->first();

        if ($user) {
            $fundraiser->user = [
                'id' => $user->id,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'email' => $user->email,
                'phone' => $user->phone,
            ];
        }

        $fundraiser->donations = $donations;

        return $fundraiser;
    }


    public function getFundraisersByCategory($category)
{
    $fundraisers = DB::select("SELECT * FROM fundraiser WHERE category = ?", [$category]);

    if (empty($fundraisers)) {
        return response()->json(['message' => 'No fundraisers found in this category'], 404);
    }

    $fundraisers = array_map(function ($fundraiser) {
        $donations = DB::table('donation')
            ->where('fundraiser_id', $fundraiser->id)
            ->get();
        return $this->attachUserDetailsAndDonations($fundraiser, $donations);
    }, $fundraisers);

    return response()->json(['fundraisers' => $fundraisers]);
}


public function searchFundraisers(Request $request)
{
    $title = $request->query('title', '');
    $description = $request->query('description', '');

    $fundraisers = DB::select("
        SELECT * FROM fundraiser 
        WHERE title LIKE ? AND description LIKE ?
    ", ["%$title%", "%$description%"]);

    if (empty($fundraisers)) {
        return response()->json(['message' => 'No fundraisers found matching the search query'], 404);
    }

    $fundraisers = array_map(function ($fundraiser) {
        $donations = DB::table('donation')
            ->where('fundraiser_id', $fundraiser->id)
            ->get();
        return $this->attachUserDetailsAndDonations($fundraiser, $donations);
    }, $fundraisers);

    return response()->json(['fundraisers' => $fundraisers]);
}


}
