export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
}

export interface Habit {
    id: string;
    title: string;
    frequency: string;
    streak: number;
}

export interface DailyStats {
    date: string;
    completedTasks: number;
    habitsTracked: number;
}

export interface TimerState {
    isActive: boolean;
    duration: number;
    startTime?: string;
}

export interface SyncData {
    lastSynced: string;
    tasks: Task[];
    habits: Habit[];
    dailyStats: DailyStats[];
}