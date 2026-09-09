<template>


  <!-- ══ HEADER ══════════════════════════════════════ -->
  <header class="glass sticky top-0 z-30 border-b border-white/60 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      <!-- Logo + Title -->
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center shadow">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-gray-800 leading-tight">ចំណូល &amp; ចំណាយ</h1>
          <p class="text-[10px] text-gray-400">Income &amp; Expense Tracker · Supabase</p>
        </div>
      </div>
      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <button @click="exportCSV"
          class="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-medium rounded-xl shadow transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          CSV
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

    <!-- ══ ERROR ═══════════════════════════════════════ -->
    <div v-if="errorMsg" class="fade bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm">
      <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span class="flex-1">{{ errorMsg }}</span>
      <button @click="errorMsg=''" class="text-red-400 hover:text-red-600 text-xl leading-none">&times;</button>
    </div>

    <!-- ══ SUMMARY CARDS ════════════════════════════════ -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <!-- Total Income USD -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណូលសរុប USD</p>
          <span class="w-8 h-8 bg-emerald-100 rounded-lg grid place-items-center">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </span>
        </div>
        <p class="text-2xl font-bold text-emerald-600">${{ totalIncomeUSD.toFixed(2) }}</p>
        <p class="text-[10px] text-gray-400 mt-0.5">{{ filteredIncomes.filter(i=>i.currency==='USD').length }} កំណត់ត្រា</p>
      </div>
      <!-- Total Income KHR -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណូលសរុប KHR</p>
          <span class="w-8 h-8 bg-emerald-100 rounded-lg grid place-items-center">
            <span class="text-emerald-600 font-bold text-sm">៛</span>
          </span>
        </div>
        <p class="text-2xl font-bold text-emerald-600">{{ totalIncomeKHR.toLocaleString() }}</p>
        <p class="text-[10px] text-gray-400 mt-0.5">រៀល</p>
      </div>
      <!-- Total Expense USD -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណាយសរុប USD</p>
          <span class="w-8 h-8 bg-red-100 rounded-lg grid place-items-center">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </span>
        </div>
        <p class="text-2xl font-bold text-red-500">${{ totalExpenseUSD.toFixed(2) }}</p>
        <p class="text-[10px] text-gray-400 mt-0.5">{{ filteredExpenses.filter(e=>e.currency==='USD').length }} កំណត់ត្រា</p>
      </div>
      <!-- Total Expense KHR -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណាយសរុប KHR</p>
          <span class="w-8 h-8 bg-red-100 rounded-lg grid place-items-center">
            <span class="text-red-500 font-bold text-sm">៛</span>
          </span>
        </div>
        <p class="text-2xl font-bold text-red-500">{{ totalExpenseKHR.toLocaleString() }}</p>
        <p class="text-[10px] text-gray-400 mt-0.5">រៀល</p>
      </div>
      <!-- Today's Expense -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណាយថ្ងៃនេះ</p>
          <span class="w-8 h-8 bg-orange-100 rounded-lg grid place-items-center">
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </span>
        </div>
        <p class="text-xl font-bold text-orange-500">${{ todayExpenseUSD.toFixed(2) }}</p>
        <p class="text-[11px] font-bold text-orange-400 mt-0.5">{{ todayExpenseKHR.toLocaleString() }} ៛</p>
      </div>
      <!-- Net Balance USD -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-4 fade"
        :class="netUSD >= 0 ? 'border-l-4 border-l-emerald-400' : 'border-l-4 border-l-red-400'">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-gray-500">ចំណេញ / ខាត (USD)</p>
          <span class="w-8 h-8 rounded-lg grid place-items-center"
            :class="netUSD>=0 ? 'bg-emerald-100' : 'bg-red-100'">
            <svg class="w-4 h-4" :class="netUSD>=0?'text-emerald-600':'text-red-500'"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </span>
        </div>
        <p class="text-2xl font-bold" :class="netUSD>=0?'text-emerald-600':'text-red-500'">
          {{ netUSD >= 0 ? '+' : '' }}${{ netUSD.toFixed(2) }}
        </p>
        <p class="text-[10px] mt-0.5" :class="netUSD>=0?'text-emerald-400':'text-red-400'">
          {{ netUSD >= 0 ? '✅ ចំណេញ' : '⚠️ ខាត' }}
        </p>
      </div>
    </div>

    <!-- ══ CHARTS ROW ═══════════════════════════════════ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!-- Bar chart: Income vs Expense by month -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-5">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">ចំណូល vs ចំណាយ (USD/ខែ)</h3>
        <div style="height:220px">
          <canvas id="barChart"></canvas>
        </div>
      </div>
      <!-- Doughnut: Expense by category -->
      <div class="glass rounded-2xl border border-white/60 shadow-sm p-5">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">ចំណាយតាមប្រភេទ</h3>
        <div class="relative" style="height:220px">
          <canvas id="doughnutChart"></canvas>
          <div v-if="filteredExpenses.length===0 && !loading"
            class="absolute inset-0 grid place-items-center text-gray-300 text-sm">
            <div class="text-center"><div class="text-3xl">📊</div>មិនមានទិន្នន័យ</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ FILTERS ══════════════════════════════════════ -->
    <div class="glass rounded-2xl border border-white/60 shadow-sm p-4">
      <div class="flex flex-wrap items-end gap-3">
        <div class="flex-1 min-w-[130px]">
          <label class="text-xs font-medium text-gray-500 mb-1 block">ច្រោះតាមថ្ងៃ</label>
          <input type="date" v-model="filterDate"
            class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white" />
        </div>
        <div class="flex-1 min-w-[130px]">
          <label class="text-xs font-medium text-gray-500 mb-1 block">ច្រោះតាមខែ</label>
          <select v-model="filterMonth"
            class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
            <option value="">-- ខែទាំងអស់ --</option>
            <option v-for="m in MONTH_OPTIONS" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
        </div>
        <div class="flex-1 min-w-[130px]">
          <label class="text-xs font-medium text-gray-500 mb-1 block">ប្រភេទចំណាយ</label>
          <select v-model="filterExpCat"
            class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
            <option value="">-- ទាំងអស់ --</option>
            <option v-for="c in EXP_CATS" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="flex-1 min-w-[130px]">
          <label class="text-xs font-medium text-gray-500 mb-1 block">ប្រភព​ចំណូល</label>
          <select v-model="filterIncSrc"
            class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
            <option value="">-- ទាំងអស់ --</option>
            <option v-for="s in INC_SOURCES" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <button @click="resetFilters"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-xl transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Reset
        </button>
        <div class="flex gap-2 flex-wrap w-full">
          <span v-if="filterDate"    class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">📍 ថ្ងៃទី {{ filterDate }}</span>
          <span v-if="filterMonth"   class="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">📅 {{ MONTH_OPTIONS.find(m=>m.value===filterMonth)?.label || filterMonth }}</span>
          <span v-if="filterExpCat"  class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">💸 {{ filterExpCat }}</span>
          <span v-if="filterIncSrc"  class="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">💰 {{ filterIncSrc }}</span>
        </div>
      </div>
    </div>

    <!-- ══ TABS: INCOME / EXPENSE ══════════════════════ -->
    <div class="glass rounded-2xl border border-white/60 shadow-sm overflow-hidden">

      <!-- Tab Header -->
      <div class="flex border-b border-gray-100">
        <button @click="activeTab='expense'"
          :class="activeTab==='expense' ? 'text-red-500 tab-active' : 'text-gray-400 hover:text-gray-600'"
          class="flex-1 py-4 text-sm flex items-center justify-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          ចំណាយ
          <span class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-semibold">{{ filteredExpenses.length }}</span>
        </button>
        <button @click="activeTab='income'"
          :class="activeTab==='income' ? 'text-emerald-500 tab-active' : 'text-gray-400 hover:text-gray-600'"
          class="flex-1 py-4 text-sm flex items-center justify-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          ចំណូល
          <span class="bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded-full font-semibold">{{ filteredIncomes.length }}</span>
        </button>
      </div>

      <!-- ── EXPENSE TAB ── -->
      <div v-show="activeTab==='expense'">
        <!-- Add Expense Form -->
        <div class="p-5 border-b border-gray-50 bg-red-50/30">
          <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-red-100 text-red-500 grid place-items-center text-xs">+</span>
            បន្ថែមចំណាយថ្មី
          </h3>
          <form @submit.prevent="addExpense" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">កាលបរិច្ឆេទ *</label>
              <input type="date" v-model="expForm.date" required
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-300 bg-white" />
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ប្រភេទ *</label>
              <select v-model="expForm.category" required
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-300 bg-white">
                <option value="">-- ជ្រើស --</option>
                <option v-for="c in EXP_CATS" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ចំនួន *</label>
              <input type="number" v-model.number="expForm.amount" min="0" step="0.01" required placeholder="0.00"
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-300 bg-white" />
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">រូបិយប័ណ្ណ</label>
              <div class="flex gap-1.5 h-[38px]">
                <button type="button" @click="expForm.currency='USD'"
                  :class="expForm.currency==='USD'?'bg-blue-500 text-white':'bg-white text-gray-500 border-gray-200'"
                  class="flex-1 border-2 rounded-xl text-xs font-semibold transition-colors">USD</button>
                <button type="button" @click="expForm.currency='KHR'"
                  :class="expForm.currency==='KHR'?'bg-amber-500 text-white':'bg-white text-gray-500 border-gray-200'"
                  class="flex-1 border-2 rounded-xl text-xs font-semibold transition-colors">KHR</button>
              </div>
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ការពិពណ៌នា</label>
              <input type="text" v-model="expForm.description" placeholder="ពិពណ៌នា..."
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-300 bg-white" />
            </div>
            <div class="flex items-end">
              <button type="submit" :disabled="expSaving"
                class="w-full py-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow transition-all active:scale-95">
                {{ expSaving ? '⏳...' : '+ បន្ថែម' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Expense Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 text-left">
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">កាលបរិច្ឆេទ</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ប្រភេទ</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ចំនួន</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ការពិពណ៌នា</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase text-right">លុប</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-if="filteredExpenses.length===0 && !loading">
                <td colspan="5" class="py-12 text-center text-gray-300">
                  <div class="text-3xl mb-1">💸</div>
                  <p class="text-sm">មិនទាន់មានចំណាយ</p>
                </td>
              </tr>
              <template v-if="loading && expenses.length===0">
                <tr v-for="n in 3" :key="'esk'+n" class="animate-pulse">
                  <td v-for="c in 5" :key="c" class="px-5 py-4">
                    <div class="h-4 bg-gray-100 rounded"></div>
                  </td>
                </tr>
              </template>
              <tr v-for="exp in filteredExpenses" :key="'e'+exp.id" class="fade">
                <td class="px-5 py-3 text-gray-600 whitespace-nowrap">{{ fmtDate(exp.date) }}</td>
                <td class="px-5 py-3">
                  <span :class="expCatColor(exp.category)"
                    class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium">{{ exp.category }}</span>
                </td>
                <td class="px-5 py-3 font-semibold whitespace-nowrap"
                  :class="exp.currency==='USD'?'text-blue-600':'text-amber-600'">
                  {{ exp.currency==='USD'?'$':'៛' }}{{ Number(exp.amount).toLocaleString() }}
                  <span class="text-xs font-normal text-gray-400 ml-1">{{ exp.currency }}</span>
                </td>
                <td class="px-5 py-3 text-gray-500">{{ exp.description||'—' }}</td>
                <td class="px-5 py-3 text-right">
                  <button @click="deleteExpense(exp.id)"
                    class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs rounded-lg transition-colors">
                    ✕ លុប
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ── INCOME TAB ── -->
      <div v-show="activeTab==='income'">
        <!-- Add Income Form -->
        <div class="p-5 border-b border-gray-50 bg-emerald-50/30">
          <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 grid place-items-center text-xs">+</span>
            បន្ថែមចំណូលថ្មី
          </h3>
          <form @submit.prevent="addIncome" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">កាលបរិច្ឆេទ *</label>
              <input type="date" v-model="incForm.date" required
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-300 bg-white" />
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ប្រភព *</label>
              <select v-model="incForm.source" required
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-300 bg-white">
                <option value="">-- ជ្រើស --</option>
                <option v-for="s in INC_SOURCES" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ចំនួន *</label>
              <input type="number" v-model.number="incForm.amount" min="0" step="0.01" required placeholder="0.00"
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-300 bg-white" />
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">រូបិយប័ណ្ណ</label>
              <div class="flex gap-1.5 h-[38px]">
                <button type="button" @click="incForm.currency='USD'"
                  :class="incForm.currency==='USD'?'bg-blue-500 text-white':'bg-white text-gray-500 border-gray-200'"
                  class="flex-1 border-2 rounded-xl text-xs font-semibold transition-colors">USD</button>
                <button type="button" @click="incForm.currency='KHR'"
                  :class="incForm.currency==='KHR'?'bg-amber-500 text-white':'bg-white text-gray-500 border-gray-200'"
                  class="flex-1 border-2 rounded-xl text-xs font-semibold transition-colors">KHR</button>
              </div>
            </div>
            <div>
              <label class="text-[11px] text-gray-500 mb-1 block">ការពិពណ៌នា</label>
              <input type="text" v-model="incForm.description" placeholder="ពិពណ៌នា..."
                class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-300 bg-white" />
            </div>
            <div class="flex items-end">
              <button type="submit" :disabled="incSaving"
                class="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow transition-all active:scale-95">
                {{ incSaving ? '⏳...' : '+ បន្ថែម' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Income Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 text-left">
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">កាលបរិច្ឆេទ</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ប្រភព</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ចំនួន</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">ការពិពណ៌នា</th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase text-right">លុប</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-if="filteredIncomes.length===0 && !loading">
                <td colspan="5" class="py-12 text-center text-gray-300">
                  <div class="text-3xl mb-1">💰</div>
                  <p class="text-sm">មិនទាន់មានចំណូល</p>
                </td>
              </tr>
              <template v-if="loading && incomes.length===0">
                <tr v-for="n in 3" :key="'isk'+n" class="animate-pulse">
                  <td v-for="c in 5" :key="c" class="px-5 py-4">
                    <div class="h-4 bg-gray-100 rounded"></div>
                  </td>
                </tr>
              </template>
              <tr v-for="inc in filteredIncomes" :key="'i'+inc.id" class="fade">
                <td class="px-5 py-3 text-gray-600 whitespace-nowrap">{{ fmtDate(inc.date) }}</td>
                <td class="px-5 py-3">
                  <span :class="incSrcColor(inc.source)"
                    class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium">{{ inc.source }}</span>
                </td>
                <td class="px-5 py-3 font-semibold whitespace-nowrap text-emerald-600">
                  {{ inc.currency==='USD'?'$':'៛' }}{{ Number(inc.amount).toLocaleString() }}
                  <span class="text-xs font-normal text-gray-400 ml-1">{{ inc.currency }}</span>
                </td>
                <td class="px-5 py-3 text-gray-500">{{ inc.description||'—' }}</td>
                <td class="px-5 py-3 text-right">
                  <button @click="deleteIncome(inc.id)"
                    class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs rounded-lg transition-colors">
                    ✕ លុប
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p class="text-center text-xs text-gray-300 pb-2">ចំណូល &amp; ចំណាយ · Vue 3 + Supabase REST API</p>
  </main>

</template>

<script setup>

import { ref, computed, watch, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

// ── Supabase REST ────────────────────────────
const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const SB_H   = {
  'apikey':        SB_KEY,
  'Authorization': 'Bearer ' + SB_KEY,
  'Content-Type':  'application/json',
  'Prefer':        'return=representation',
}
async function sbFetch(path, opts = {}) {
  const res = await fetch(SB_URL + '/rest/v1' + path, {
    ...opts, headers: { ...SB_H, ...(opts.headers || {}) }
  })
  if (!res.ok) {
    const e = await res.json().catch(() => ({}))
    throw new Error(e.message || e.hint || res.statusText)
  }
  const t = await res.text()
  return t ? JSON.parse(t) : []
}

const KHR = 4100

// Categories / Sources
const EXP_CATS   = ['អាហារ','សេវាសង្គម','ការសិក្សា','ចរាចរណ៍','សុខភាព','កំសាន្ត','ផ្ទះ','ផ្សេងៗ']
const INC_SOURCES = ['ប្រាក់បៀវត្ស','អាជីវកម្ម','Freelance','ការវិនិយោគ','ជួលទ្រព្យ','អំណោយ','ផ្សេងៗ']

const EXP_COLORS = {
  'អាហារ':'bg-amber-100 text-amber-700','សេវាសង្គម':'bg-pink-100 text-pink-700',
  'ការសិក្សា':'bg-blue-100 text-blue-700','ចរាចរណ៍':'bg-green-100 text-green-700',
  'សុខភាព':'bg-red-100 text-red-700','កំសាន្ត':'bg-purple-100 text-purple-700',
  'ផ្ទះ':'bg-indigo-100 text-indigo-700','ផ្សេងៗ':'bg-gray-100 text-gray-700',
}
const INC_COLORS = {
  'ប្រាក់បៀវត្ស':'bg-emerald-100 text-emerald-700','អាជីវកម្ម':'bg-teal-100 text-teal-700',
  'Freelance':'bg-cyan-100 text-cyan-700','ការវិនិយោគ':'bg-blue-100 text-blue-700',
  'ជួលទ្រព្យ':'bg-violet-100 text-violet-700','អំណោយ':'bg-rose-100 text-rose-700',
  'ផ្សេងៗ':'bg-gray-100 text-gray-600',
}

const CHART_COLORS = ['#10b981','#3b82f6','#8b5cf6','#f59e0b','#ef4444','#ec4899','#14b8a6','#6366f1']

// ── Static month dropdown list (last 24 months) ──────
const KHM_MONTHS = [
  'មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា',
  'កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'
]
const MONTH_OPTIONS = (() => {
  const opts = []
  const now  = new Date()
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const y = d.getFullYear()
    const m = d.getMonth()   // 0-based
    opts.push({
      value: `${y}-${String(m + 1).padStart(2, '0')}`,
      label: `${KHM_MONTHS[m]} ${y}`
    })
  }
  return opts
})()


    // State
    const expenses = ref([])
    const incomes  = ref([])
    const loading  = ref(false)
    const expSaving = ref(false)
    const incSaving = ref(false)
    const errorMsg  = ref('')
    const activeTab = ref('expense')

    const filterDate   = ref('')
    const filterMonth  = ref('')
    const filterExpCat = ref('')
    const filterIncSrc = ref('')

    let doughnutInst = null
    let barInst      = null

    // Forms
    const today = new Date().toISOString().slice(0,10)
    const expForm = ref({ date:today, category:'', amount:null, currency:'USD', description:'' })
    const incForm = ref({ date:today, source:'',   amount:null, currency:'USD', description:'' })

    // ── 1. getFilteredExpenses ──────────────────────
    function getFilteredExpenses() {
      return expenses.value.filter(e => {
        const okD = !filterDate.value   || e.date === filterDate.value
        const okM = !filterMonth.value  || e.date.startsWith(filterMonth.value)
        const okC = !filterExpCat.value || e.category === filterExpCat.value
        return okD && okM && okC
      })
    }
    function getFilteredIncomes() {
      return incomes.value.filter(i => {
        const okD = !filterDate.value   || i.date === filterDate.value
        const okM = !filterMonth.value  || i.date.startsWith(filterMonth.value)
        const okS = !filterIncSrc.value || i.source === filterIncSrc.value
        return okD && okM && okS
      })
    }
    const filteredExpenses = computed(getFilteredExpenses)
    const filteredIncomes  = computed(getFilteredIncomes)

    // Totals
    const totalExpenseUSD = computed(() =>
      filteredExpenses.value.filter(e=>e.currency==='USD').reduce((s,e)=>s+Number(e.amount),0))
    const totalExpenseKHR = computed(() =>
      filteredExpenses.value.filter(e=>e.currency==='KHR').reduce((s,e)=>s+Number(e.amount),0))
    const totalIncomeUSD  = computed(() =>
      filteredIncomes.value.filter(i=>i.currency==='USD').reduce((s,i)=>s+Number(i.amount),0))
    const totalIncomeKHR  = computed(() =>
      filteredIncomes.value.filter(i=>i.currency==='KHR').reduce((s,i)=>s+Number(i.amount),0))
    
    // Today's Expenses
    const todayStr = new Date().toISOString().slice(0,10)
    const todayExpenseUSD = computed(() =>
      expenses.value.filter(e=>e.date===todayStr && e.currency==='USD').reduce((s,e)=>s+Number(e.amount),0))
    const todayExpenseKHR = computed(() =>
      expenses.value.filter(e=>e.date===todayStr && e.currency==='KHR').reduce((s,e)=>s+Number(e.amount),0))

    const netUSD = computed(() =>
      (totalIncomeUSD.value + totalIncomeKHR.value/KHR)
      - (totalExpenseUSD.value + totalExpenseKHR.value/KHR))

    // ── 2. updateChart ──────────────────────────────
    function updateDoughnut(data) {
      const totals = {}
      data.forEach(e => {
        const u = e.currency==='KHR' ? Number(e.amount)/KHR : Number(e.amount)
        totals[e.category] = (totals[e.category]||0) + u
      })
      const labels = Object.keys(totals)
      const vals   = Object.values(totals)
      const colors = labels.map((_,i)=>CHART_COLORS[i%CHART_COLORS.length])
      const canvas = document.getElementById('doughnutChart')
      if (!canvas) return
      if (doughnutInst) { doughnutInst.destroy(); doughnutInst = null }
      if (!labels.length) return
      doughnutInst = new Chart(canvas, {
        type: 'doughnut',
        data: { labels, datasets:[{ data:vals, backgroundColor:colors, borderColor:'#fff', borderWidth:3 }] },
        options: {
          responsive:true, maintainAspectRatio:false, cutout:'62%',
          plugins: {
            legend: { position:'bottom', labels:{ font:{family:'Kantumruy Pro',size:10}, color:'#6b7280', padding:8, usePointStyle:true } },
            tooltip: { callbacks:{ label: ctx => {
              const t = ctx.dataset.data.reduce((a,b)=>a+b,0)
              return ` $${ctx.parsed.toFixed(2)} (${((ctx.parsed/t)*100).toFixed(1)}%)`
            }}}
          }
        }
      })
    }

    function updateBar() {
      // Group income & expense by YYYY-MM
      const months = {}
      const allItems = [
        ...incomes.value.map(i=>({...i, _type:'income'})),
        ...expenses.value.map(e=>({...e, _type:'expense'}))
      ]
      allItems.forEach(item => {
        const m = item.date.slice(0,7)
        if (!months[m]) months[m] = { income:0, expense:0 }
        const u = item.currency==='KHR' ? Number(item.amount)/KHR : Number(item.amount)
        if (item._type==='income')  months[m].income  += u
        else                        months[m].expense += u
      })
      const sortedMonths = Object.keys(months).sort()
      const incData = sortedMonths.map(m=>+months[m].income.toFixed(2))
      const expData = sortedMonths.map(m=>+months[m].expense.toFixed(2))
      const canvas = document.getElementById('barChart')
      if (!canvas) return
      if (barInst) { barInst.destroy(); barInst = null }
      if (!sortedMonths.length) return
      barInst = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: sortedMonths,
          datasets: [
            { label:'ចំណូល', data:incData, backgroundColor:'#10b981cc', borderRadius:6, borderSkipped:false },
            { label:'ចំណាយ', data:expData, backgroundColor:'#ef4444cc', borderRadius:6, borderSkipped:false },
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {
            legend: { labels:{ font:{family:'Kantumruy Pro',size:11}, color:'#4b5563', usePointStyle:true } }
          },
          scales: {
            x: { ticks:{ font:{family:'Kantumruy Pro',size:10}, color:'#9ca3af' }, grid:{display:false} },
            y: { ticks:{ font:{family:'Kantumruy Pro',size:10}, color:'#9ca3af' }, grid:{color:'#f1f5f9'} }
          }
        }
      })
    }

    // ── 3. render ────────────────────────────────────
    async function render() {
      loading.value  = true
      errorMsg.value = ''
      try {
        const [expData, incData] = await Promise.all([
          sbFetch('/expenses?select=*&order=date.desc'),
          sbFetch('/incomes?select=*&order=date.desc'),
        ])
        expenses.value = expData
        incomes.value  = incData
        await nextTick()
        updateDoughnut(getFilteredExpenses())
        updateBar()
      } catch(err) {
        console.error(err)
        errorMsg.value = 'Error: ' + err.message
      } finally {
        loading.value = false
      }
    }

    // ── 4. addExpense ────────────────────────────────
    async function addExpense() {
      if (!expForm.value.date || !expForm.value.category || !expForm.value.amount) return
      expSaving.value = true
      try {
        await sbFetch('/expenses', {
          method: 'POST',
          body: JSON.stringify({
            date:expForm.value.date, category:expForm.value.category,
            amount:expForm.value.amount, currency:expForm.value.currency,
            description:expForm.value.description.trim()
          })
        })
        expForm.value.amount = null; expForm.value.description = ''
        await render()
      } catch(err) { errorMsg.value = 'បន្ថែមមិនបាន: '+err.message }
      finally { expSaving.value = false }
    }

    // ── addIncome ─────────────────────────────────────
    async function addIncome() {
      if (!incForm.value.date || !incForm.value.source || !incForm.value.amount) return
      incSaving.value = true
      try {
        await sbFetch('/incomes', {
          method: 'POST',
          body: JSON.stringify({
            date:incForm.value.date, source:incForm.value.source,
            amount:incForm.value.amount, currency:incForm.value.currency,
            description:incForm.value.description.trim()
          })
        })
        incForm.value.amount = null; incForm.value.description = ''
        await render()
      } catch(err) { errorMsg.value = 'បន្ថែមមិនបាន: '+err.message }
      finally { incSaving.value = false }
    }

    // ── 5. deleteExpense / deleteIncome ──────────────
    async function deleteExpense(id) {
      if (!confirm('លុបចំណាយនេះ?')) return
      try {
        await sbFetch('/expenses?id=eq.'+id, { method:'DELETE', headers:{'Prefer':''} })
        await render()
      } catch(err) { errorMsg.value = 'លុបមិនបាន: '+err.message }
    }
    async function deleteIncome(id) {
      if (!confirm('លុបចំណូលនេះ?')) return
      try {
        await sbFetch('/incomes?id=eq.'+id, { method:'DELETE', headers:{'Prefer':''} })
        await render()
      } catch(err) { errorMsg.value = 'លុបមិនបាន: '+err.message }
    }

    // ── 6. Filter watch ──────────────────────────────
    watch([filterDate, filterMonth, filterExpCat, filterIncSrc], async () => {
      await nextTick()
      updateDoughnut(getFilteredExpenses())
    })
    function resetFilters() {
      filterDate.value = ''; filterMonth.value = ''; filterExpCat.value = ''; filterIncSrc.value = ''
    }

    // ── 7. exportCSV ─────────────────────────────────
    function exportCSV() {
      const expRows = getFilteredExpenses().map(e=>
        ['ចំណាយ', e.date, e.category, e.amount, e.currency, `"${(e.description||'').replace(/"/g,'""')}"`].join(',')
      )
      const incRows = getFilteredIncomes().map(i=>
        ['ចំណូល', i.date, i.source, i.amount, i.currency, `"${(i.description||'').replace(/"/g,'""')}"`].join(',')
      )
      if (!expRows.length && !incRows.length) { alert('មិនមានទិន្នន័យ!'); return }
      const header = 'ប្រភេទ,កាលបរិច្ឆេទ,ប្រភព/ប្រភេទ,ចំនួន,រូបិយប័ណ្ណ,ការពិពណ៌នា'
      const csv = [header, ...expRows, ...incRows].join('\n')
      const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'})
      const url = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), {
        href:url, download:`ចំណូល_ចំណាយ_${new Date().toISOString().slice(0,10)}.csv`
      })
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    }

    // Helpers
    function fmtDate(d) {
      return new Date(d+'T00:00').toLocaleDateString('km-KH',
        {year:'numeric',month:'short',day:'numeric'})
    }
    function expCatColor(c) { return EXP_COLORS[c]||'bg-gray-100 text-gray-600' }
    function incSrcColor(s) { return INC_COLORS[s]||'bg-gray-100 text-gray-600' }

    onMounted(render)


    

</script>
