<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "desc" =>$this->description,
            "photos" => PhotoResource::collection($this->photos),
            "price" => $this->price,
            "rate" => $this->rate,
            "category" => $this->category->name,
            "comments" => CommentResource::collection($this->comments)
        ];
    }
}
