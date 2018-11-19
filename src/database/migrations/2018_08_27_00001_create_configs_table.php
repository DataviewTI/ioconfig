<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigsTable extends Migration
{
    public function up()
    {
			Schema::create('configs', function(Blueprint $table)
			{
				$table->increments('id');
				$table->char('name',20);
        $table->integer('user_id')->unsigned()->nullable();
        $table->integer('service_id')->unsigned()->nullable();
        $table->integer('group_id')->unsigned()->nullable();
				$table->string('description')->nullable();
				$table->text('configuration');
        $table->timestamps();
				$table->softDeletes();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade')->onUpdate('cascade');
        $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade')->onUpdate('cascade');
			});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('configs');
    }
}
