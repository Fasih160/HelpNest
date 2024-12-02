<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    public function createDonation(Request $request)
    {
        $user = $request->user();
        Log::info('Creating donation for user', ['user_id' => $user->id]);

        $validated = $request->validate([
            'fundraiser_id' => 'required|exists:fundraiser,id',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'paymentMethod' => 'required|string',
            'paymentStatus' => 'required|string',
            'amount' => 'required|numeric',
        ]);

        try {
            $sql = "INSERT INTO donation (user_id, fundraiser_id, firstName, lastName, email, phone, paymentMethod, paymentStatus, amount, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            DB::insert($sql, [
                $user->id,
                $validated['fundraiser_id'],
                $validated['firstName'],
                $validated['lastName'],
                $validated['email'],
                $validated['phone'],
                $validated['paymentMethod'],
                $validated['paymentStatus'],
                $validated['amount'],
                now(),
                now(),
            ]);

            $fundraiser = DB::selectOne('SELECT amountRaised FROM fundraiser WHERE id = ?', [$validated['fundraiser_id']]);
        
            if ($fundraiser) {
                $newAmountRaised = $fundraiser->amountRaised + $validated['amount'];
    
                DB::update(
                    "UPDATE fundraiser SET amountRaised = ? WHERE id = ?",
                    [$newAmountRaised, $validated['fundraiser_id']]
                );
            }
    

            $donation = DB::selectOne("SELECT * FROM donation WHERE user_id = ? AND fundraiser_id = ? ORDER BY id DESC LIMIT 1", [
                $user->id,
                $validated['fundraiser_id'],
            ]);
            $donationWithDetails = $this->attachUserAndFundraiser($donation);

            return response()->json(['donation' => $donationWithDetails], 201);

        } catch (\Exception $e) {
            Log::error('Error creating donation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error creating donation'], 500);
        }
    }

    public function getAllDonations(Request $request)
    {
        $user = $request->user();
        Log::info('Fetching all donations for user', ['user_id' => $user->id]);

        try {
            $donations = DB::select("SELECT * FROM donation WHERE user_id = ?", [$user->id]);

            $donations = array_map(function ($donation) {
                return $this->attachUserAndFundraiser($donation);
            }, $donations);

            return response()->json(['donations' => $donations]);

        } catch (\Exception $e) {
            Log::error('Error fetching donations', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error fetching donations'], 500);
        }
    }

    public function getDonationById($id, Request $request)
    {
        $user = $request->user();
        Log::info('Fetching donation by ID', ['user_id' => $user->id, 'donation_id' => $id]);

        try {
            $donation = DB::selectOne("SELECT * FROM donation WHERE id = ?", [$id]);

            if (!$donation) {
                return response()->json(['message' => 'Donation not found'], 404);
            }

            $donationWithDetails = $this->attachUserAndFundraiser($donation);

            return response()->json(['donation' => $donationWithDetails]);

        } catch (\Exception $e) {
            Log::error('Error fetching donation by ID', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error fetching donation'], 500);
        }
    }

    public function updateDonation(Request $request, $id)
    {
        $user = $request->user();
        Log::info('Updating donation', ['user_id' => $user->id, 'donation_id' => $id]);
    
        $validated = $request->validate([
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'sometimes|string|max:20',
            'paymentMethod' => 'sometimes|string',
            'paymentStatus' => 'sometimes|string',
            'amount' => 'sometimes|numeric',
        ]);
    
        if (empty($validated)) {
            return response()->json(['message' => 'No data provided for update'], 400);
        }
    
        $setClause = [];
        $values = [];
        foreach ($validated as $key => $value) {
            $setClause[] = "$key = ?";
            $values[] = $value;
        }
    
        $setClause[] = "updated_at = ?";
        $values[] = now();
        $values[] = $id;
    
        try {
            $sql = "UPDATE donation SET " . implode(', ', $setClause) . " WHERE id = ?";
            Log::info('Executing SQL', ['query' => $sql, 'values' => $values]);
    
            $updated = DB::update($sql, $values);
    
            if (!$updated) {
                Log::warning('Donation not found', ['donation_id' => $id]);
                return response()->json(['message' => 'Donation not found'], 404);
            }
    
            $donation = DB::selectOne("SELECT * FROM donation WHERE id = ?", [$id]);
            if (!$donation) {
                Log::error('Failed to fetch updated donation', ['donation_id' => $id]);
                return response()->json(['message' => 'Error fetching updated donation'], 500);
            }
    
            $donationWithDetails = $this->attachUserAndFundraiser($donation);
    
            return response()->json(['donation' => $donationWithDetails]);
    
        } catch (\Exception $e) {
            Log::error('Error updating donation', [
                'error' => $e->getMessage(),
                'query' => $sql,
                'values' => $values,
            ]);
            return response()->json(['message' => 'Error updating donation', 'details' => $e->getMessage()], 500);
        }
    }
    
    public function deleteDonation($id, Request $request)
    {
        $user = $request->user();
        Log::info('Deleting donation', ['user_id' => $user->id, 'donation_id' => $id]);

        try {
            $deleted = DB::delete("DELETE FROM donation WHERE id = ?", [$id]);

            if (!$deleted) {
                return response()->json(['message' => 'Donation not found'], 404);
            }

            return response()->json(['message' => 'Donation deleted successfully']);

        } catch (\Exception $e) {
            Log::error('Error deleting donation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error deleting donation'], 500);
        }
    }

    private function attachUserAndFundraiser($donation)
    {
        $user = DB::table('users')->where('id', $donation->user_id)->first();
        if ($user) {
            $donation->user = $user;
        }

        $fundraiser = DB::table('fundraiser')->where('id', $donation->fundraiser_id)->first();
        if ($fundraiser) {
            $donation->fundraiser = $fundraiser;
        }

        return $donation;
    }
}
