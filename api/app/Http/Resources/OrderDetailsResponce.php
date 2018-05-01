<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsResponce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "foodId" => $this->id,
            "name" => $this->name,
            "amount" => $this->pivot->quantity,
            "price" => $this->price,
            "category" => $this->category ? $this->category->name : "",
            "categoryId" => $this->category ? $this->category->id : "",
        ];
    }
}
