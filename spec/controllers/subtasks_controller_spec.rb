require 'rails_helper'

RSpec.describe SubtasksController, type: :controller do
  let!(:task) { create(:task) }
  let!(:subtask) { create(:subtask, task: task) }
  let(:valid_attributes) { { description: 'New Subtask', task_id: task.id, completed: false } }
  let(:invalid_attributes) { { description: '', task_id: nil, completed: nil } }

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new Subtask" do
        expect {
          post :create, params: { subtask: valid_attributes }
        }.to change(Subtask, :count).by(1)
      end

      it "renders a JSON response with the new subtask" do
        post :create, params: { subtask: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(JSON.parse(response.body)["task"]["description"]).to eq('New Subtask')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new subtask" do
        post :create, params: { subtask: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    context "with valid parameters" do
      let(:new_attributes) { { description: 'Updated Subtask', completed: true } }

      it "updates the requested subtask" do
        put :update, params: { id: subtask.to_param, subtask: new_attributes }
        subtask.reload
        expect(subtask.description).to eq('Updated Subtask')
        expect(subtask.completed).to be_truthy
      end

      it "renders a JSON response with the subtask" do
        put :update, params: { id: subtask.to_param, subtask: valid_attributes }
        expect(response).to be_successful
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the subtask" do
        put :update, params: { id: subtask.to_param, subtask: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested subtask" do
      expect {
        delete :destroy, params: { id: subtask.to_param }
      }.to change(Subtask, :count).by(-1)
    end

    it "renders a JSON response with the subtask" do
      delete :destroy, params: { id: subtask.to_param }
      expect(response).to be_successful
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end
