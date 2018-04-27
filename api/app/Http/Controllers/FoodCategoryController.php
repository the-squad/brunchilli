<?php

namespace App\Http\Controllers;

use App\FoodCategory;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\FoodResource;
use Illuminate\Http\Request;

class FoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CategoryResource::collection(FoodCategory::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            "name" => "required|min:2|max:50"
        ]);

        $category = new FoodCategory();
        $category->fill($request->all());
        if ($category->save())
            return response(["id" => $category->id],200);
        return response('',500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FoodCategory  $foodCategory
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new CategoryResource( FoodCategory::find($id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FoodCategory  $foodCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            "name" => "required|min:2|max:50"
        ]);

        $category = FoodCategory::find($id);
        $category->fill($request->all());
        if ($category->save())
            return response('',200);
        return response('',500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FoodCategory  $foodCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = FoodCategory::find($id);
        if ($category->delete())
            return response('',200);
        return response('',500);
    }
}
