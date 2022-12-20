<?php

namespace App\Service;

use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Task;
use App\Entity\User;
use App\Entity\Status;
use App\Service\FileUploader;

use Doctrine\DBAL\Exception;

class TaskService
{
    private $em;
    private FileUploader $fileUploader;

    public function __construct(ManagerRegistry $managerRegistry, FileUploader $fileUploader){
        $this->em = $managerRegistry->getManager();
        $this->fileUploader = $fileUploader;
    }

    public function createTask($title, $content, $file, User $user) : Task
    {
        $task = new Task();
        $statusRepository = $this->em->getRepository(Status::class);
        $status = $statusRepository->findOneByName("waiting");

        try{
            $task->setTitle($title);
            $task->setContent($content);
            $task->setUser($user);
            $task->setStatus($status);
            if($file){
                $fileName = $this->fileUploader->upload($file);
                $task->setAttachment($fileName);
            }
            $this->em->persist($task);
            $this->em->flush();
        }
        catch(DBALException $e) {
            $errorMessage = $e->getMessage();
        }
        catch(\Exception $e) {
            $errorMessage = $e->getMessage();
        }

        return $task;
    }
    
    public function deleteTask($task) : void
    {
        try{
            $this->em->remove($task);
            $this->em->flush();
        }
        catch(DBALException $e) {
            $errorMessage = $e->getMessage();
        }
        catch(\Exception $e) {
            $errorMessage = $e->getMessage();
        }
    }

    public function updateTask($task, $status) : Task
    {
        $currentStatus = $task->getStatus();
        $currentStatusName = $currentStatus->getName();
        $statusName = $status->getName();
        $errorMessage = "can't update Status";
        if($currentStatusName === "waiting" && ($statusName !== "in progress" && $statusName !== "closed"))
        {
            throw new Exception($errorMessage);
        }
        elseif ($currentStatusName === "in progress" && ($statusName !== "closed"))
        {
            throw new Exception($errorMessage);
        }
        elseif ($currentStatusName === "closed")
        {
            throw new Exception($errorMessage);
        }

        try{
            $task->setStatus($status);
            $this->em->flush();
        }
        catch(DBALException $e) {
            $errorMessage = $e->getMessage();
        }
        catch(\Exception $e) {
            $errorMessage = $e->getMessage();
        }

        return $task;
    }
}