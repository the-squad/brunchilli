<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResponce;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Mockery\Exception;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OrderResponce::collection(Order::with(['foods.category','user'])->latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            \DB::beginTransaction();
            $user = User::find($request->user_id);
            $order = new Order();
            $order->user()->associate($user);
            $order->address = $request->get('address' , $user->address);
            $order->total_money = 0;
            if ($order->save()) {
                $order->foods()->sync($request->foods);
                foreach ($order->foods as $food)
                    $order->total_money += $food->price;
                if ($order->save()) {
                    \DB::commit();
                    return response('', 200);
                }
            }
            \DB::rollBack();
            return response('', 500);
        } catch (\Exception $exception) {
            \DB::rollBack();
            return response('', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
