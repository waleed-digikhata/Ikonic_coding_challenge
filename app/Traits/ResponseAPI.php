<?php

namespace App\Traits;

trait ResponseAPI
{
    /**
     * Core of response
     *
     * @param   string          $message
     * @param   array|object    $data
     * @param   integer         $statusCode
     * @param   boolean         $isSuccess
     */
    public function coreResponse($message, $data = null,$key,$statusCode, $isSuccess = true)
    {
        // Check the params
        if(!$message) return response()->json(['message' => 'Message is required'], 500);

        // Send the response
        if($isSuccess) {
            return response()->json([
                'message' => $message,
//                'error' => false,
                'success'=> true,
                'code' => $statusCode,
                $key => $data
            ]);
        } else {

            return response()->json([
                'message' => $message,
//                'errors' => true,
//                'error' => $message,
                'success'=> false,
                'code' => $statusCode,
            ]);
        }
    }

    /**
     * Send any success response
     *
     * @param   string          $message
     * @param   array|object    $data
     * @param   integer         $statusCode
     */
    public function success($message, $data, $key, $statusCode = 200)
    {
        return $this->coreResponse($message, $data,$key, $statusCode);
    }

    /**
     * Send any error response
     *
     * @param   string          $message
     * @param   integer         $statusCode
     */
    public function error($message, $statusCode = 500)
    {
        return $this->coreResponse($message, null, '' ,$statusCode, false);
    }

}
