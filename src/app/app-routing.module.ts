import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  // {path:'', redirectTo:'blog',pathMatch:'full'},
  { path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
  {  
    path:'blog', loadChildren:
    ()=>import('./modules/blog/blog.module')
  .then(r=>r.BlogModule),pathMatch:'full'
 },
 {
  path:'admin', loadChildren:
  ()=>import('./modules/admin/admin.module')
.then(a=>a.AdminModule),pathMatch:'full'
},
{ path:'**', component:PnfComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
