<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
       $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

       User::create($fields);

       return response()->json([
           'data' => [
               'message' => 'User created successfully'
           ]
       ]);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email|exists:users',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'data' => [
                    'message' => 'Invalid credentials'
                ]
            ]);
        }

        $token = $user->createToken($user->email)->plainTextToken;

        return response()->json([
            'data' => [
                'message' => 'Login successful',
                'token' => $token
            ]
        ]);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
    }
}
