class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = Task.all
    render json: { tasks: @tasks }
  end

  def show
    render json: @task.as_json(include: :subtasks)
  end

  def new
    @task = Task.new
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: { task: task }, status: :created
    else
      render json: { error: 'Failed to create task' }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @task.destroy
      render json: { message: 'Task deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete task' }, status: :unprocessable_entity
    end
  end

  def get_filtered_tasks
    tasks = Task.all
    status_filter = params[:statusfilter].to_i
    date_filter = params[:datefilter].to_i

    filtered_tasks = case status_filter
                     when 0
                       tasks.pending
                     when 1
                       tasks.in_progress
                     when 2
                       tasks.completed
                     else
                       tasks
                     end

    @tasks = case date_filter
             when 0
               filtered_tasks.where(deadline: Date.today.all_day)
             when 1
               filtered_tasks.where(deadline: Date.today.beginning_of_week..Date.today.end_of_week)
             when 2
               filtered_tasks.where('deadline < ?', Date.today)
             else
               filtered_tasks
             end

    render json: @tasks
  end

  private 

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:heading, :description, :deadline, :status, subtasks_attributes: [:id, :description, :_destroy])
  end
end
