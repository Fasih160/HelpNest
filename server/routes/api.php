<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FundraiserController;
use App\Http\Controllers\DonationController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/login-admin', [UserController::class, 'loginAdmin']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::put('/users/{id}', [UserController::class, 'updateUser']);
Route::get('/get-all-users', [UserController::class, 'getAllUsers']);
Route::get('/users/{id}', [UserController::class, 'getUserDetails']);
Route::get('/fundraisers/category/{category}', [FundraiserController::class, 'getFundraisersByCategory']); //get Fundraiser by category
Route::get('/fundraiser/search', [FundraiserController::class, 'searchFundraisers']);// search for a fundraiser
Route::get('/fundraisers', [FundraiserController::class, 'getAllFundraisers']); // Get all fundraisers
Route::get('/fundraisers/{id}', [FundraiserController::class, 'getFundraiser']); // Get a fundraiser by ID
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'getUserDetailsByToken']); // Get user details by token
    Route::post('/logout', [UserController::class, 'logout']); // Logout user
    Route::post('/fundraisers', [FundraiserController::class, 'createFundraiser']); // Create a fundraiser
    Route::get('/user-fundraisers', [FundraiserController::class, 'getFundraisersByUser']); // Get all fundraisers by user token
    Route::put('/fundraisers/{id}', [FundraiserController::class, 'updateFundraiser']); // Update a fundraiser
    Route::delete('/fundraisers/{id}', [FundraiserController::class, 'deleteFundraiser']);
    Route::post('donations', [DonationController::class, 'createDonation']); // Create a donation
    Route::get('donations', [DonationController::class, 'getAllDonations']);// Get donations user id
    Route::get('donations/{id}', [DonationController::class, 'getDonationById']);// Get a donation by ID
    Route::put('donations/{id}', [DonationController::class, 'updateDonation']);// Update a donation
    Route::delete('donations/{id}', [DonationController::class, 'deleteDonation']);// Delete a donation
});
