<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Photo
 *
 * @property int $id
 * @property string|null $path
 * @property int|null $food_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereFoodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Photo extends Model
{
    protected $fillable = ['path','food_id'];
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
