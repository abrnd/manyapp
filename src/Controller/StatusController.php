<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Repository\StatusRepository;


class StatusController extends AbstractController
{
    #[Route('/status/get', name: 'get_status', methods: ['GET'])]
    public function getStatus(StatusRepository $statusRepository): JsonResponse
    {
        $status = $statusRepository->findAll();
        return $this->json([
            "status" => $status
        ], 200, [], ['groups' => 'status']);
    }
}