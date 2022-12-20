<?php

namespace App\Service;

use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;
use Doctrine\DBAL\Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AuthService
{

    private $em;
    private UserPasswordHasherInterface $hasher;

    public function __construct(ManagerRegistry $managerRegistry, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->em = $managerRegistry->getManager();
        $this->hasher = $userPasswordHasher;   
    }

    public function addUser($data) : User
    {
        //assign $username, $password, $admin
        extract(get_object_vars($data));

        $user = new User();
        try {
            $user->setUsername($username);
            $user->setPassword(
                $this->hasher->hashPassword(
                    $user,
                    $password
                )
            );
            $admin ? $user->setRoles(['ROLE_ADMIN']) : $user->setRoles(['ROLE_USER']);
    
            $this->em->persist($user);
            $this->em->flush();
        }
        catch(DBALException $e) {
            $errorMessage = $e->getMessage();
        }
        catch(\Exception $e) {
            $errorMessage = $e->getMessage();
        }

        return $user;
    }
}