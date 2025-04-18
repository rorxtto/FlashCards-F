import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
    let router = inject(Router);

  if (!loginService.isAuthenticated()) {  // Verifique se o usuário está logado
    alert("Você precisa estar autenticado para acessar esta página.");
    router.navigate(['/login']);
    return false;
  }

  const restrictedRoutes = [
    /^\/admin\/materias$/,                        // Exatamente /admin/materias
    /^\/admin\/materias\/new$/,                   // Exatamente /admin/materias/new
    /^\/admin\/materias\/edit\/\d+$/,             // /admin/materias/edit/:id onde :id é um número
    /^\/admin\/submaterias$/,                     // Exatamente /admin/submaterias
    /^\/admin\/submaterias\/new$/,                // Exatamente /admin/submaterias/new
    /^\/admin\/submaterias\/edit\/\d+$/,          // /admin/submaterias/edit/:id onde :id é um número
    /^\/admin\/questoes$/,                        // Exatamente /admin/questoes
    /^\/admin\/questoes\/new$/,                   // Exatamente /admin/questoes/new
    /^\/admin\/questoes\/edit\/\d+$/,             // /admin/questoes/edit/:id onde :id é um número
  ];
  
  if (
    loginService.hasPermission("USER") &&
    restrictedRoutes.some(pattern => pattern.test(state.url))
  ) {
    alert("Você não tem permissão para acessar esta rota");
    router.navigate(['/login']);
    return false;
  }
  
  

  return true;
};
