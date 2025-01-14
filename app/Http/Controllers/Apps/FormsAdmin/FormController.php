<?php

namespace App\Http\Controllers\Apps\FormsAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Forms\CreateFormRequest;
use App\Http\Requests\Forms\DestroyFormRequest;
use App\Http\Requests\Forms\DuplicateFormRequest;
use App\Http\Requests\Forms\SubmitFormRequest;
use App\Http\Resources\Apps\Forms\FormResource;
use App\Models\Form;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Apps/FormsAdmin/Index', [
            'items' => FormResource::collection(Form::all()),
        ]);
    }



    public function editor(Request $request, Form $form)
    {
        return Inertia::render('Apps/FormsAdmin/Editor', [
            'item' => new FormResource($form),
        ]);
    }



    public function store(CreateFormRequest $request)
    {
        $form = Form::create($request->validated());

        $form->pages()->create([
            'title' => 'Page 1',
        ]);

        return back();
    }



    public function duplicate(DuplicateFormRequest $request, Form $form)
    {
        $form->duplicate();

        return back();
    }



    public function update(Request $request, Form $form)
    {
        $form->update([
            'name' => $request->title,
            'type' => $request->type,
            'status' => $request->status,
        ]);



        foreach ($request->pages as $index => $page)
        {
            $formPage = $form->pages()->updateOrCreate([
                'id' => $page['id'],
            ], [
                'title' => $page['title'],
                'order' => $index,
            ]);



            foreach ($page['inputs'] as $input)
            {
                $formPage->inputs()->updateOrCreate([
                    'id' => $input['id'],
                ], [
                    'type' => $input['type'],
                    'key' => $input['key'],
                    'options' => $input['options'],
                    'validation' => $input['validation'],
                ]);
            }

            // Remove deleted inputs (aka. inputs that are not in the request anymore)
            $formPage->inputs()->whereNotIn('id', collect($page['inputs'])->pluck('id')->toArray())->delete();
        }

        // Remove deleted pages (aka. pages that are not in the request anymore)
        $form->pages()->whereNotIn('id', collect($request->pages)->pluck('id')->toArray())->delete();



        foreach ($request->actions as $index => $action)
        {
            $form->actions()->updateOrCreate([
                'id' => $action['id'],
            ], [
                'type' => $action['type'],
                'options' => $action['options'],
                'order' => $index,
            ]);
        }

        // Remove deleted actions (aka. actions that are not in the request anymore)
        $form->actions()->whereNotIn('id', collect($request->actions)->pluck('id')->toArray())->delete();

        // Redirect to the editor
        return redirect()->route('admin.forms.forms.editor', new FormResource($form));
    }



    public function delete(DestroyFormRequest $request)
    {
        Form::whereIn('id', $request->ids)->delete();

        return back();
    }
}
