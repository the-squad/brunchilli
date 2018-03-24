<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function Login(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "password" => "required|min:5|max:50"
        ]);

        $user = User::where('email', '=', $request->email)->get()->first();
        if ($user->password != $request->password) {
            return response('errr pass', 500);
        }
        return $user;
    }

    public function Register(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|unique:users,email",
            "password" => "required|min:5|max:50|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/"
        ]);
    }
}
