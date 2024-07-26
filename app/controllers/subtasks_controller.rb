class SubtasksController < ApplicationController
  before_action :set_subtask, only: [:update, :destroy]

  def create
    subtask = Subtask.new(subtask_params)
    if subtask.save
      render json: { task: subtask }, status: :created
    else
      render json: { error: 'Failed to create task' }, status: :unprocessable_entity
    end
  end

  def update
    if @subtask.update(subtask_params)
      render json: @subtask
    else
      render json: @subtask.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @subtask.destroy
      render json: { message: 'Subtask deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete subtask' }, status: :unprocessable_entity
    end
  end

  private 

  def set_subtask
    @subtask = Subtask.find(params[:id])
  end

  def subtask_params
    params.require(:subtask).permit(:description, :status, :task_id, :completed)
  end
end