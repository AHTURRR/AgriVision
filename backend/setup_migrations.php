<?php

$dir = __DIR__ . '/database/migrations/';

function updateMigration($file, $schema) {
    global $dir;
    $path = $dir . $file;
    if (!file_exists($path)) {
        echo "File $file not found\n";
        return;
    }
    
    $content = file_get_contents($path);
    $pattern = '/Schema::create\(\'(.*?)\', function \(Blueprint \$table\) \{(.*?)\}\);/s';
    
    $replacement = "Schema::create('$1', function (Blueprint \$table) {\n            \$table->id();\n" . $schema . "\n            \$table->timestamps();\n        });";
    
    // For some tables we might not want timestamps, but let's just keep them for simplicity or handle it in schema
    if (strpos($schema, 'timestamps()') !== false) {
       $replacement = "Schema::create('$1', function (Blueprint \$table) {\n            \$table->id();\n" . $schema . "\n        });";
    }
    
    $newContent = preg_replace($pattern, $replacement, $content);
    file_put_contents($path, $newContent);
    echo "Updated $file\n";
}

updateMigration('2026_09_19_024120_create_farms_table.php', <<<EOF
            \$table->foreignId('user_id')->constrained()->cascadeOnDelete();
            \$table->string('name');
            \$table->string('location')->nullable();
            \$table->json('metadata')->nullable();
EOF);

updateMigration('2026_09_19_024121_create_farm_blocks_table.php', <<<EOF
            \$table->foreignId('farm_id')->constrained()->cascadeOnDelete();
            \$table->string('name');
            \$table->decimal('area', 8, 2)->nullable();
            \$table->text('description')->nullable();
EOF);

updateMigration('2026_09_19_024122_create_crops_table.php', <<<EOF
            \$table->string('name');
            \$table->string('latin_name')->nullable();
            \$table->string('type')->nullable();
EOF);

updateMigration('2026_09_19_024123_create_diagnoses_table.php', <<<EOF
            \$table->foreignId('user_id')->constrained()->cascadeOnDelete();
            \$table->foreignId('farm_block_id')->nullable()->constrained()->nullOnDelete();
            \$table->foreignId('crop_id')->nullable()->constrained()->nullOnDelete();
            \$table->string('status')->default('pending'); // pending, processing, completed, failed, low_confidence, unknown
            \$table->string('ai_model_version')->nullable();
            \$table->string('ai_provider')->nullable();
            \$table->integer('processing_time_ms')->nullable();
            \$table->decimal('confidence_score', 5, 4)->nullable(); // e.g. 0.8750
            \$table->string('disease_name')->nullable();
            \$table->string('latin_name')->nullable();
            \$table->string('category')->nullable();
            \$table->text('limitations')->nullable();
            \$table->text('treatment_notes')->nullable();
EOF);

updateMigration('2026_09_19_024124_create_diagnosis_images_table.php', <<<EOF
            \$table->foreignId('diagnosis_id')->constrained()->cascadeOnDelete();
            \$table->string('path');
            \$table->string('original_name');
            \$table->string('mime_type');
            \$table->integer('file_size');
            \$table->integer('width')->nullable();
            \$table->integer('height')->nullable();
            \$table->string('checksum')->nullable();
EOF);

updateMigration('2026_09_19_024125_create_diagnosis_symptoms_table.php', <<<EOF
            \$table->foreignId('diagnosis_id')->constrained()->cascadeOnDelete();
            \$table->integer('number');
            \$table->string('title');
            \$table->text('description');
EOF);

updateMigration('2026_09_19_024126_create_diagnosis_actions_table.php', <<<EOF
            \$table->foreignId('diagnosis_id')->constrained()->cascadeOnDelete();
            \$table->string('letter', 10);
            \$table->string('title');
            \$table->text('description');
EOF);

updateMigration('2026_09_19_024127_create_diagnosis_verifications_table.php', <<<EOF
            \$table->foreignId('diagnosis_id')->constrained()->cascadeOnDelete();
            \$table->foreignId('user_id')->constrained()->cascadeOnDelete();
            \$table->enum('status', ['confirmed', 'uncertain', 'different']);
            \$table->text('note')->nullable();
EOF);

updateMigration('2026_09_19_024128_create_education_modules_table.php', <<<EOF
            \$table->string('title');
            \$table->text('summary');
            \$table->json('content'); // Array of strings
            \$table->string('reading_time')->nullable();
            \$table->string('image')->nullable();
            \$table->string('category')->nullable();
            \$table->string('badge')->nullable();
            \$table->string('badge_color')->nullable();
            \$table->string('icon')->nullable();
            \$table->string('tag')->nullable();
            \$table->string('tag_icon')->nullable();
            \$table->string('status')->default('published');
            \$table->timestamp('published_at')->nullable();
EOF);

updateMigration('2026_09_19_024129_create_sensor_telemetries_table.php', <<<EOF
            \$table->foreignId('farm_block_id')->constrained()->cascadeOnDelete();
            \$table->timestamp('timestamp');
            \$table->integer('leaf_moisture')->nullable();
            \$table->decimal('ambient_temp', 5, 2)->nullable();
            \$table->integer('light_index_lux')->nullable();
            \$table->integer('air_humidity')->nullable();
            \$table->integer('lesion_risk_score')->nullable();
            \$table->index(['farm_block_id', 'timestamp']);
EOF);

echo "All done.\n";
