<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            "name" => $this->user->name,
            "photo" => $this->user->getPhotoPath(),
            "rate" =>$this->rate,
            "review" => $this->review
        ];
    }
}
