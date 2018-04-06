<?php

namespace App\Http\Controllers;

use App\User;
use Faker\Provider\Image;
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
            "photo" => "nullable",
            "name" => "required|min:3|max:15",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6|max:50",
            "phone" => "required|digits:11",
            "address" => "required|min:6|max:50"
        ]);
        \DB::beginTransaction();
        $user = new User();
        $user->fill($request->all());
        if ($user->save()) {
            if ($request->photo) {
                $photo = $request->photo;
                $png_url = "/img/" . time() . ".png";
                $path = public_path() . "/storage" . $png_url;
                $data = explode(',', $photo)[1];
                $data = base64_decode($data);
                Image::make($data)->resize(500, 500)->save($path);
                $user->photo = $png_url;
            }
            \DB::commit();
            return response($user, 200);
        }
        \DB::rollBack();
        return response('Something went wrong', 504);
    }
}
