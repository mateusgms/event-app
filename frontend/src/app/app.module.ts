// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BlogComponent } from './components/blog/blog.component';
import { EventComponent } from './components/event/event.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { ListBlogsComponent } from './components/list-blogs/list-blogs.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { FootBarComponent } from './components/foot-bar/foot-bar.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { SupportComponent } from './components/support/support.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingComponent } from './components/loading/loading.component';

// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    LogInComponent,
    EventDetailsComponent,
    BlogDetailsComponent,
    EventComponent,
    BlogComponent,
    FootBarComponent,
    SupportComponent,
    ListUsersComponent,
    ListEventsComponent,
    ListBlogsComponent,
    VoucherComponent,
    AddEventComponent,
    AddBlogComponent,
    DashboardComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatCarouselModule.forRoot(),
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
