<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Food
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $category_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $description
 * @property float $price
 * @property int $rate
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Food whereRate($value)
 */
class Food extends Model
{
    //
}
