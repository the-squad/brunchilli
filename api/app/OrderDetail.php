<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\OrderDetail
 *
 * @mixin \Eloquent
 * @property int $id
 * @property int $quantity
 * @property float $price
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int $order_id
 * @property int $food_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereFoodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderDetail whereUpdatedAt($value)
 */
class OrderDetail extends Model
{
    public $timestamps = false;
    public function getPriceAttribute()
    {
        $this->attributes['price'] = Food::find($this->id) * $this->quantity;
    }
}
