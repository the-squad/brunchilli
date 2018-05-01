<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Order
 *
 * @property int $id
 * @property string|null $location
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $address
 * @property float $total_money
 * @property int $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereTotalMoney($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUserId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Food[] $foods
 * @property-read \App\User $user
 */
class Order extends Model
{
    public function foods()
    {
        return $this->belongsToMany(Food::class,'order_details')->withPivot(['quantity']);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
