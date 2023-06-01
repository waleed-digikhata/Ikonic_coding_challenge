<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;
    public $table = 'request';
    protected $with = ['User'];
    protected $fillable = ['user_id','request_id','mode'];
    public function User()
    {
        return $this->belongsTo(User::class, 'request_id', 'id');
    }
}
