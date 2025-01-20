<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // Check browser's preferred languages
        $preferredLanguage = $request->getPreferredLanguage(['en', 'it']);
        
        // If the browser requests 'en' or 'it', set that. Otherwise default to 'en'.
        App::setLocale($preferredLanguage === 'it' ? 'it' : 'en');
        
        return $next($request);
    }
}


