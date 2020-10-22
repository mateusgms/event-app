import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { EventComponent } from './components/event/event.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SupportComponent } from './components/support/support.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'post',
    component: PostComponent,
  },
  {
    path: 'post/:postId',
    component: PostDetailsComponent,
  },
  {
    path: 'event',
    component: EventComponent,
  },
  {
    path: 'event/:eventId',
    component: EventDetailsComponent,
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'suporte',
    component: SupportComponent,
  },
  {
    path: 'voucher/:eventId',
    component: VoucherComponent,
  },
  {
    path: 'listusers',
    component: ListUsersComponent,
  },
  {
    path: 'listposts',
    component: ListPostsComponent,
  },
  {
    path: 'listevents',
    component: ListEventsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'addpost',
    component: AddPostComponent,
  },
  {
    path: 'addpost/:postId',
    component: AddPostComponent,
  },
  {
    path: 'addevent',
    component: AddEventComponent,
  },
  {
    path: 'addevent/:eventId',
    component: AddEventComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
