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
 * @property-read \App\FoodCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Order[] $orders
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Photo[] $photos
 */
class Food extends Model
{
    protected $fillable = ['name','description','price','category_id'];

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class,'order_details');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function category()
    {
        return $this->belongsTo(FoodCategory::class,'category_id');
    }

    public function getRate()
    {
        $rate = 0;
        foreach ($this->comments as $comment)
            $rate += $comment->rate;
        return $this->comments->count() == 0 ? 5 : ceil($rate/$this->comments->count());
    }
}
