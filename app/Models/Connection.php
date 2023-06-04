<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    use HasFactory;
    public $table = 'connection';
    protected $with = ['User','CommonConnection'];
    protected $fillable = ['user_id','connection_id'];
    public function User()
    {
        return $this->belongsTo(User::class, 'connection_id', 'id');
    }
    public function CommonConnection()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
