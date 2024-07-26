require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let!(:task) { create(:task) }
  let(:valid_attributes) { { heading: 'New Task', description: 'Task description', deadline: Date.tomorrow, status: 'pending' } }
  let(:invalid_attributes) { { heading: '', description: '', deadline: '', status: '' } }

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)["tasks"].length).to eq(Task.count)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: task.to_param }
      expect(response).to be_successful
      expect(JSON.parse(response.body)["id"]).to eq(task.id)
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new Task" do
        expect {
          post :create, params: { task: valid_attributes }
        }.to change(Task, :count).by(1)
      end

      it "renders a JSON response with the new task" do
        post :create, params: { task: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(JSON.parse(response.body)["task"]["heading"]).to eq('New Task')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new task" do
        post :create, params: { task: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    context "with valid parameters" do
      let(:new_attributes) { { heading: 'Updated Task' } }

      it "updates the requested task" do
        put :update, params: { id: task.to_param, task: new_attributes }
        task.reload
        expect(task.heading).to eq('Updated Task')
      end

      it "renders a JSON response with the task" do
        put :update, params: { id: task.to_param, task: valid_attributes }
        expect(response).to be_successful
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the task" do
        put :update, params: { id: task.to_param, task: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested task" do
      expect {
        delete :destroy, params: { id: task.to_param }
      }.to change(Task, :count).by(-1)
    end

    it "renders a JSON response with the task" do
      delete :destroy, params: { id: task.to_param }
      expect(response).to be_successful
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  describe "GET #get_filtered_tasks" do
    it "returns a success response" do
      get :get_filtered_tasks, params: { statusfilter: 0, datefilter: 0 }
      expect(response).to be_successful
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end