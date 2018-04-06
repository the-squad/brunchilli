<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

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
            "name"=>"required|min:3|max:15",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6|max:50",
            "phone"=>"required|digits:11",
            "address"=>"required|min:6|max:50"
        ]);

        $user = new User();
        $user->fill($request->all());
        if ($user->save())
            return response($user,200);

        return response('Something went wrong',504);
    }
}
