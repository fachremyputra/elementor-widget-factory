const fs = require('fs');
const path = require('path');

const widgetName = process.argv[2];

if (!widgetName) {
    console.error('Please provide a widget name: node create-widget.js WidgetName');
    process.exit(1);
}

const widgetFileName = widgetName.toLowerCase().replace(/\s+/g, '-') + '-widget.php';
const widgetClassName = widgetName.replace(/\s+/g, '_') + '_Widget';

const widgetTemplate = `<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class ${widgetClassName} extends \\Elementor\\Widget_Base {

    public function get_name() {
        return '${widgetName.toLowerCase()}';
    }

    public function get_title() {
        return __( '${widgetName}', 'elementor-custom-widgets' );
    }

    public function get_icon() {
        return 'eicon-code';
    }

    public function get_categories() {
        return [ 'general' ];
    }

    protected function _register_controls() {

        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'Content', 'elementor-custom-widgets' ),
                'tab' => \\Elementor\\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'text',
            [
                'label' => __( 'Text', 'elementor-custom-widgets' ),
                'type' => \\Elementor\\Controls_Manager::TEXT,
                'default' => __( 'Default text', 'elementor-custom-widgets' ),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        echo '<div class="example-widget">';
        echo '<h2>' . $settings['text'] . '</h2>';
        echo '</div>';
    }
}
`;

const widgetFilePath = path.join(__dirname, 'widgets', widgetFileName);

fs.writeFile(widgetFilePath, widgetTemplate, (err) => {
    if (err) {
        console.error('Error creating widget file:', err);
    } else {
        console.log(`Widget file created at ${widgetFilePath}`);
    }
});
