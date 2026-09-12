CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Drop table if it already exists
DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE NOT NULL,
    category VARCHAR(100),
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES public.organization (organization_id)
        ON DELETE CASCADE
);

INSERT INTO public.projects (organization_id, title, description, location, date, category)
VALUES 
    -- Projects from your EJS template
    (1, 'Park Cleanup', 'Join us to clean up local parks and make them beautiful!', 'Community Park', '2026-10-15', 'Environment'),
    (2, 'Food Drive', 'Help collect and distribute food to those in need.', 'Central Community Center', '2026-10-22', 'Community Support'),
    (3, 'Community Tutoring', 'Volunteer to tutor students in various subjects.', 'Public Library', '2026-11-05', 'Education'),

    -- Additional sample projects to fulfill the 15-project requirement
    (1, 'Tree Planting Initiative', 'Plant native trees in urban green spaces to improve canopy cover.', 'Riverfront Park', '2026-10-28', 'Environment'),
    (1, 'Beach & River Cleanup', 'Remove plastic waste and debris from local waterways.', 'North River Bank', '2026-11-12', 'Environment'),
    (1, 'Trail Maintenance Day', 'Clear overgrown brush and repair wooden walkways on hiking trails.', 'Highland Ridge Trail', '2026-11-20', 'Environment'),
    (1, 'Community Garden Prep', 'Prepare garden beds and compost for the upcoming planting season.', 'Eastside Community Garden', '2026-12-02', 'Environment'),

    (2, 'Holiday Food Box Assembly', 'Pack essential food items into boxes for local families.', 'Food Bank Warehouse', '2026-11-15', 'Community Support'),
    (2, 'Soup Kitchen Service', 'Prepare and serve warm meals to shelter residents.', 'Downtown Mission', '2026-11-26', 'Community Support'),
    (2, 'Senior Grocery Delivery', 'Deliver essential groceries and supplies to homebound seniors.', 'Westside Senior Center', '2026-12-05', 'Community Support'),
    (2, 'School Lunch Snack Drive', 'Collect non-perishable snack items for elementary school programs.', 'City Drop-Off Center', '2026-12-10', 'Community Support'),

    (3, 'After-School Homework Club', 'Assist middle school students with math and science homework.', 'Lincoln Middle School', '2026-10-18', 'Education'),
    (3, 'Youth Coding Workshop', 'Introduce elementary students to basic programming concepts.', 'Tech Education Hub', '2026-10-25', 'Education'),
    (3, 'Book Drive & Library Sorting', 'Collect, inspect, and organize donated books for local school libraries.', 'Main Branch Library', '2026-11-08', 'Education'),
    (3, 'STEM Science Fair Mentoring', 'Guide high school students on science fair project experiments.', 'Community Science Lab', '2026-11-18', 'Education');




