<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserController extends Controller
{

    public function loginAdmin(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = DB::select('SELECT * FROM users WHERE email = ? AND role = ?', [$validated['email'], 'admin']);

    if ($user && Hash::check($validated['password'], $user[0]->password)) 
    {
        $eloquentUser = User::find($user[0]->id);

        $token = $eloquentUser->createToken('AdminAccess')->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful',
            'admin' => $user[0],
            'token' => $token,
        ]);
    }

    return response()->json(['message' => 'Invalid credentials or not an admin'], 401);
}

    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'role' => 'required|string',
            'password' => 'required|string|min:8',
            
        ]);
    
        $hashedPassword = Hash::make($validated['password']);
    
        DB::insert(
            'INSERT INTO users (firstName, lastName, email, phone, role, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $validated['firstName'],
                $validated['lastName'],
                $validated['email'],
                $validated['phone'],
                $validated['role'],
                $hashedPassword,
                now(),
                now()
            ]
        );
    
        $user = DB::select('SELECT * FROM users WHERE email = ?', [$validated['email']])[0];
    
        $eloquentUser = User::find($user->id);
    
        $token = $eloquentUser->createToken('Fundraiser')->plainTextToken;
    
        $user->fundraisers = [];
        $user->donations = [];
    
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    

    public function login(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = DB::select('SELECT * FROM users WHERE email = ?', [$validated['email']]);

    if ($user && Hash::check($validated['password'], $user[0]->password)) 
    {
        $eloquentUser = User::find($user[0]->id);
    
        $token = $eloquentUser->createToken('Fundraiser')->plainTextToken;

        $user[0]->fundraisers = DB::select('SELECT * FROM fundraiser WHERE user_id = ?', [$user[0]->id]);
        $user[0]->donations = DB::select('SELECT * FROM donation WHERE user_id = ?', [$user[0]->id]);

        return response()->json([
            'message' => 'Login successful',
            'user' => $user[0],
            'token' => $token,
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}

public function updateUser(Request $request, $id)
{
    $user = DB::selectOne('SELECT * FROM users WHERE id = ?', [$id]);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $validated = $request->validate([
        'firstName' => 'sometimes|string|max:255',
        'lastName' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:users,email,' . $id,
        'phone' => 'sometimes|string',
        'role' => 'sometimes|string',
        'password' => 'sometimes|string|min:8',
    ]);

    if (empty($validated)) {
        return response()->json(['message' => 'No changes provided'], 400);
    }

    $columns = [];
    $values = [];

    foreach ($validated as $key => $value) {
        if ($key === 'password') {
            $value = Hash::make($value); 
        }
        $columns[] = "`$key` = ?";
        $values[] = $value;
    }

    $columns[] = "updated_at = ?";
    $values[] = now();

    $values[] = $id;

    try {
        $query = "UPDATE users SET " . implode(', ', $columns) . " WHERE id = ?";
        $updated = DB::update($query, $values);

        if (!$updated) {
            return response()->json(['message' => 'No changes made to the user'], 400);
        }

        $updatedUser = DB::selectOne('SELECT * FROM users WHERE id = ?', [$id]);

        if ($updatedUser) {
            $updatedUser->fundraisers = DB::select('SELECT * FROM fundraiser WHERE user_id = ?', [$id]);
            $updatedUser->donations = DB::select('SELECT * FROM donation WHERE user_id = ?', [$id]);

            return response()->json(['message' => 'User updated successfully', 'user' => $updatedUser]);
        }

        return response()->json(['message' => 'User not found'], 404);
    } catch (\Exception $e) {
        Log::error('Error updating user', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Error updating user'], 500);
    }
}

    public function deleteUser($id)
    {
        DB::delete('DELETE FROM users WHERE id = ?', [$id]);
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getUserDetails($id)
    {
        $user = DB::select('SELECT * FROM users WHERE id = ?', [$id]);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $fundraisers = DB::select('SELECT * FROM fundraiser WHERE user_id = ?', [$id]);
        $donations = DB::select('SELECT * FROM donation WHERE user_id = ?', [$id]);

        $user[0]->fundraisers = $fundraisers;
        $user[0]->donations = $donations;

        return response()->json(['user' => $user[0]]);
    }

    public function getUserDetailsByToken(Request $request)
{
    $authenticatedUser = $request->user();

    if (!$authenticatedUser) {
        return response()->json(['message' => 'Invalid or missing token'], 401);
    }

    $userId = $authenticatedUser->id;

    $user = DB::select('SELECT * FROM users WHERE id = ?', [$userId]);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $fundraisers = DB::select('SELECT * FROM fundraiser WHERE user_id = ?', [$userId]);
    $donations = DB::select('SELECT * FROM donation WHERE user_id = ?', [$userId]);

    $user[0]->fundraisers = $fundraisers;
    $user[0]->donations = $donations;

    return response()->json(['user' => $user[0]]);
}



public function logout(Request $request)
{
    $authenticatedUser = $request->user();

    if ($authenticatedUser) {
        $authenticatedUser->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    return response()->json(['message' => 'Invalid or missing token'], 401);
}


public function getAllUsers() 
{
    $users = DB::select('SELECT * FROM users');

    if (empty($users)) {
        return response()->json(['message' => 'No users found'], 404);
    }

    foreach ($users as $user) {
        $user->fundraisers = DB::select('SELECT * FROM fundraiser WHERE user_id = ?', [$user->id]);
        $user->donations = DB::select('SELECT * FROM donation WHERE user_id = ?', [$user->id]);
    }

    return response()->json(['users' => $users]);
}


}
