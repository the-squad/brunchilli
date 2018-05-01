<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResponce extends JsonResource
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
            "orderDate" => $this->created_at->diffForHumans(),
            "orderId" => $this->id,
            "name" => $this->user->name,
            "address" => $this->address,
            "phoneNumber" => $this->user->phone,
            "photo" => $this->user->getPhotoPath(),
            "orderDetails" => OrderDetailsResponce::collection($this->foods)
        ];
    }
}
