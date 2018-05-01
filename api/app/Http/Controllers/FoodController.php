<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Food;
use App\Http\Resources\FoodResource;
use App\Photo;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $text = $request->get('query');
        return FoodResource::collection(Food::with(['photos', 'category', 'comments.user'])->when($text, function ($query) use ($text) {
            return $query->where('name', 'like', '%' . $text . '%');
        })->paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "name" => "required|min:3|max:50",
            "description" => "nullable|max:200",
            "price" => "required|numeric",
            "category_id" => "nullable|exists:food_categories,id",
            "img" => "required|array|min:1",
            "img.*" => "required"
        ]);
        \DB::beginTransaction();
        $i = 0;
        $food = new Food();
        $food->fill($request->all());
        $food->save();
        foreach ($request->img as $photo) {
            $png_url = "/img/" . time() . "_" . $i . ".png";
            $path = public_path() . "/storage" . $png_url;
            $data = explode(',', $photo)[1];
            $data = base64_decode($data);
            Image::make($data)->fit(500, 500)->save($path);
            $img = new Photo();
            $img->path = $png_url;
            $img->food_id = $food->id;
            if (!$img->save())
                \DB::rollBack();
            $i++;
        }
        \DB::commit();
        return new FoodResource($food);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Food $food
     * @return \Illuminate\Http\Response
     */
    public function show(Food $food)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Food $food
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Food $food)
    {
        $this->validate($request, [
            "name" => "required|min:3|max:50",
            "description" => "nullable|max:200",
            "price" => "required|numeric",
            "category_id" => "nullable|exists:food_categories,id",
            "img" => "required|array|min:1",
            "img.*" => "required"
        ]);
        \DB::beginTransaction();
        $i = 0;
        $food->fill($request->all());
        $food->save();
        foreach ($food->photos as $photo) {
            $photo->delete();
        }
        foreach ($request->img as $photo) {
            $png_url = "/img/" . time() . "_" . $i . ".png";
            $path = public_path() . "/storage" . $png_url;
            $data = explode(',', $photo)[1];
            $data = base64_decode($data);
            Image::make($data)->fit(500, 500)->save($path);
            $img = new Photo();
            $img->path = $png_url;
            $img->food_id = $food->id;
            if (!$img->save())
                \DB::rollBack();
            $i++;
        }
        \DB::commit();
        return new FoodResource(Food::with(['photos','comments','category'])->find($food->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Food $food
     * @return \Illuminate\Http\Response
     */
    public function destroy(Food $food)
    {
        foreach ($food->photos as $photo) {
            $photo->delete();
        }
        $food->delete();
    }

    public function createComment(Request $request)
    {
        $this->validate($request, [
            "review" => "nullable|min:3|max:50",
            "user_id" => "required|exists:users,id",
            "food_id" => "required|exists:foods,id"
        ]);
        $comment = new Comment();
        $comment->fill($request->all());
        if ($comment->save())
            return response('', 200);

        return response('error', 500);
    }


    public function updateComment(Request $request , Comment $comment)
    {
        $this->validate($request, [
            "review" => "nullable|min:3|max:50",
        ]);
        $comment->fill($request->all());
        if ($comment->save())
            return response('', 200);
        return response('error', 500);
    }

    public function deleteComment(Comment $comment)
    {
        try {
            if ($comment->delete())
                return response('', 200);
        } catch (\Exception $exception) {
            return response('error', 500);
        }
        return response('error', 500);
    }
}
