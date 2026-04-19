import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKeys = {
    tasks: '@tasks',
    habits: '@habits',
    dailyStats: '@dailyStats',
    timerState: '@timerState',
};

export const StorageService = {
    // CRUD for tasks
    async getTasks() {
        try {
            const tasks = await AsyncStorage.getItem(storageKeys.tasks);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    },

    async addTask(task: object) {
        const tasks = await this.getTasks();
        tasks.push(task);
        await AsyncStorage.setItem(storageKeys.tasks, JSON.stringify(tasks));
    },

    async updateTask(updatedTask: object) {
        const tasks = await this.getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            await AsyncStorage.setItem(storageKeys.tasks, JSON.stringify(tasks));
        }
    },

    async deleteTask(taskId: string) {
        const tasks = await this.getTasks();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        await AsyncStorage.setItem(storageKeys.tasks, JSON.stringify(updatedTasks));
    },

    // CRUD for habits
    async getHabits() {
        try {
            const habits = await AsyncStorage.getItem(storageKeys.habits);
            return habits ? JSON.parse(habits) : [];
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    },

    async addHabit(habit: object) {
        const habits = await this.getHabits();
        habits.push(habit);
        await AsyncStorage.setItem(storageKeys.habits, JSON.stringify(habits));
    },

    async updateHabit(updatedHabit: object) {
        const habits = await this.getHabits();
        const index = habits.findIndex(habit => habit.id === updatedHabit.id);
        if (index !== -1) {
            habits[index] = updatedHabit;
            await AsyncStorage.setItem(storageKeys.habits, JSON.stringify(habits));
        }
    },

    async deleteHabit(habitId: string) {
        const habits = await this.getHabits();
        const updatedHabits = habits.filter(habit => habit.id !== habitId);
        await AsyncStorage.setItem(storageKeys.habits, JSON.stringify(updatedHabits));
    },

    // CRUD for daily stats
    async getDailyStats() {
        try {
            const dailyStats = await AsyncStorage.getItem(storageKeys.dailyStats);
            return dailyStats ? JSON.parse(dailyStats) : [];
        } catch (error) {
            console.error('Error fetching daily stats:', error);
        }
    },

    async addDailyStat(dailyStat: object) {
        const dailyStats = await this.getDailyStats();
        dailyStats.push(dailyStat);
        await AsyncStorage.setItem(storageKeys.dailyStats, JSON.stringify(dailyStats));
    },

    async updateDailyStat(updatedStat: object) {
        const dailyStats = await this.getDailyStats();
        const index = dailyStats.findIndex(stat => stat.id === updatedStat.id);
        if (index !== -1) {
            dailyStats[index] = updatedStat;
            await AsyncStorage.setItem(storageKeys.dailyStats, JSON.stringify(dailyStats));
        }
    },

    async deleteDailyStat(statId: string) {
        const dailyStats = await this.getDailyStats();
        const updatedStats = dailyStats.filter(stat => stat.id !== statId);
        await AsyncStorage.setItem(storageKeys.dailyStats, JSON.stringify(updatedStats));
    },

    // CRUD for timer state
    async getTimerState() {
        try {
            const state = await AsyncStorage.getItem(storageKeys.timerState);
            return state ? JSON.parse(state) : null;
        } catch (error) {
            console.error('Error fetching timer state:', error);
        }
    },

    async setTimerState(state: object) {
        await AsyncStorage.setItem(storageKeys.timerState, JSON.stringify(state));
    },

    async clearTimerState() {
        await AsyncStorage.removeItem(storageKeys.timerState);
    },
};