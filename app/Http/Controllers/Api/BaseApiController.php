<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class BaseApiController extends Controller
{
    /**
     * Send success response.
     *
     * @param mixed $result
     * @param string $message
     * @param int $code
     * @return Response
     */
    public function sendResponse($result, string $message = '', int $code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }

    /**
     * Send error response.
     *
     * @param string $error
     * @param array $errorMessages
     * @param int $code
     * @return Response
     */
    public function sendError(string $error, array $errorMessages = [], int $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
} 