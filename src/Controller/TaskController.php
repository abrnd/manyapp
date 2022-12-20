<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

use App\Service\TaskService;
use App\Repository\TaskRepository;
use App\Repository\StatusRepository;



class TaskController extends AbstractController
{
    private TaskService $taskService;

    public function __construct( TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    #[Route('/task/add', name: 'add_task', methods: ['POST'])]
    public function createTask(Request $request): JsonResponse
    {
        $task = $this->taskService->createTask(
            $request->request->get('title'), 
            $request->request->get('content'), 
            $request->files->get('file'), 
            $this->getUser()
        );

        return $this->json([
            "task" => $task
        ], 200, [], ['groups' => 'task']);
    }

    #[Route('/task/get', name: 'get_task', methods: ['GET'])]
    public function getTask(TaskRepository $taskRepository): JsonResponse
    {

        $tasks = $this->isGranted('ROLE_ADMIN') ? $taskRepository->findAll() : $this->getUser()->getTasks();
        
        return $this->json([
            "tasks" => $tasks
        ], 200, [], ['groups' => 'task']);        
    }

    #[Route('/task/del', name: 'del_task', methods: ['DELETE'])]
    public function deleteTask(Request $request, TaskRepository $taskRepository): JsonResponse
    {
        $data = json_decode($request->getContent());
        $this->taskService->deleteTask($taskRepository->findOneById($data->taskId));

        return $this->json([]);
    }

    #[Route('/task/update', name: 'update_task', methods: ['PUT'])]
    public function updateTask(Request $request, TaskRepository $taskRepository, StatusRepository $statusRepository): JsonResponse
    {
        $data = json_decode($request->getContent());
        try{
            $task = $this->taskService->updateTask($taskRepository->findOneById($data->taskId), $statusRepository->findOneById($data->statusId));
        } catch(Exception $e)
        {
            return $this->json([
                "message" => $e->getMessage()
            ], 403);
        }

        return $this->json([
            "task" => $task
        ], 200, [], ['groups' => 'task']);
    }

    #[Route('/task/download/{id}', name: 'download_attachment', methods: ['GET'])]
    public function downloadAttachment(int $id,  TaskRepository $taskRepository)
    {

        $fileName = $taskRepository->findOneById($id)->getAttachment();
        $fileInfo = pathinfo($fileName);
        $extension = $fileInfo['extension'];
        $path = $this->getParameter('kernel.project_dir').'\public\uploads\attachments\\'.$fileName;

        
        dump($extension);

        return $this->file($path);
    }

    #[Route('task/extension/{id}', name: 'get_extension', methods: ['GET'])]
    public function getextension(int $id, TaskRepository $taskRepository)
    {
        $fileName = $taskRepository->findOneById($id)->getAttachment();
        $fileInfo = pathinfo($fileName);
        $extension = $fileInfo['extension'];

        return $this->json([
            "extension" => $extension
        ], 200);
    }
    
}