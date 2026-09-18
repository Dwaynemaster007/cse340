import {
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId,
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Show list of upcoming service projects
const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    next(error);
  }
};

// Show single project details with category tags
const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      return next(err);
    }

    const categories = await getCategoriesByProjectId(projectId);
    const title = project.title;

    res.render('project', { title, project, categories });
  } catch (error) {
    next(error);
  }
};

export { showProjectsPage, showProjectDetailsPage };