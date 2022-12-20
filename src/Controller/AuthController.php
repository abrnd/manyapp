<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

use App\Service\AuthService;

class AuthController extends AbstractController
{
    private AuthService $authService;

    public function __construct( AuthService $authService)
    {
        $this->authService = $authService;
    }

    #[Route('/auth/me', name: 'me', methods: ['GET'])]
    public function getAuthenticatedUser()
    {
        $authenticated = is_null($this->getUser()) ? false : true;
        return $this->json([
            'authenticated' => $authenticated,
            'user' => $this->getUser()
        ], 200, [], ['groups' => 'user']);
    }

    #[Route('/auth/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('should not be reached');
    }

    #[Route('/auth/signup', name: 'signup', methods: ['POST'])]
    public function signup(Request $request) 
    {

        $user = $this->authService->addUser(json_decode($request->getContent()));
        return $this->json([], 200);
    }
    
    #[Route('/auth/signin', name: 'signin', methods: ['POST'])]
    public function signin(): JsonResponse
    {
        
        if(!$this->isGranted('IS_AUTHENTICATED_FULLY')){
            return $this->json([
                'error' => 'Invalid login request'
            ], 400);
        }
        return $this->json([
            'user' => $this->getUser() ? $this->getUser()->getId() : null
        ]);
    }
}