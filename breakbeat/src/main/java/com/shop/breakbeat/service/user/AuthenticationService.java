package com.shop.breakbeat.service.user;

import com.shop.breakbeat.dto.request.SignUpRequest;
import com.shop.breakbeat.dto.request.SigninRequest;
import com.shop.breakbeat.dto.response.user.JwtAuthenticationResponse;

public interface AuthenticationService {
	
	/** REGISTRO */
    JwtAuthenticationResponse signup(SignUpRequest request);
    /** ACCESO a Token JWT */
    JwtAuthenticationResponse signin(SigninRequest request);
}
