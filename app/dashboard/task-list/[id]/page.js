import TaskDetails from '../../../../components/dashboard/worker/TaskDetails'

export const metadata = { title: 'Task Details — TaskNova' }

export default function TaskDetailsPage({ params }) {
    return <TaskDetails id={params.id} />
}