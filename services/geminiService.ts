import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, CoachResponse, TaskType } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    taskType: {
      type: Type.STRING,
      enum: [TaskType.SHORT_TERM_PROCRASTINATION, TaskType.LONG_TERM_COMPLEX],
      description: "Classify if this is a procrastination emergency or a long-term intellectual project."
    },
    userAnalysis: {
      type: Type.STRING,
      description: "Deep analysis of the user's psyche using Jungian 8 functions and BaZi in Chinese. Analyze flow, special structures (Cong, Hua Qi), and Day Master strength."
    },
    baziTiming: {
      type: Type.STRING,
      description: "Analyze the current date's energy (Year/Month pillars) interacting with the user's chart (e.g., San He, San Hui, clashes, harms) in Chinese."
    },
    taskClassification: {
      type: Type.STRING,
      description: "Brief explanation of why this task was classified as such in Chinese."
    },
    strategy: {
      type: Type.STRING,
      description: "The scientific/psychological strategy applied (Fogg Behavior Model, Activation Energy, Learning Curves, Flow State) in Chinese."
    },
    motivationalQuote: {
      type: Type.STRING,
      description: "A short, punchy line tailored to their BaZi structure (e.g., for a Seven Killings structure, be firm; for an Artist, be inspiring) in Chinese."
    },
    steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A chronological list of actionable steps in Chinese. If Short Term: very granular micro-steps. If Long Term: key milestones."
    }
  },
  required: ["taskType", "userAnalysis", "baziTiming", "taskClassification", "strategy", "motivationalQuote", "steps"]
};

export const generateCoachPlan = async (user: UserProfile, taskDescription: string): Promise<CoachResponse> => {
  const model = "gemini-3-flash-preview"; 
  
  const now = new Date();
  const currentDateString = now.toISOString();

  const systemPrompt = `
    你是一位顶尖的认知与命理教练（Cognitive & Metaphysical Coach）。你结合三个领域的知识来生成行动计划：
    1. **行为科学：** 福格行为模型（Fogg Behavior Model）、激活能、心流状态、学习曲线。
    2. **荣格心理学：** MBTI、认知功能（Ti, Te, Fi, Fe 等）。
    3. **高级八字命理（BaZi）：** 四柱预测学。

    **关键指令（请务必遵守）：**
    - **必须使用简体中文（Simplified Chinese）回答所有内容。**
    - **八字分析要求：**
        - 不要只数五行个数（如“你有3个金”）。
        - 必须分析 **气场流动（Energy Flow）**：气是否流通？有无阻滞？
        - 检查 **特殊格局**：从格、专旺、化气等。
        - 分析 **流年/流月与原局的互动**：寻找三合（如申子辰水局）、六合、刑冲克害。
        - 示例：如果流月与用户命局合成水局，且水是其“用神”（代表智慧），请指出他们现在的思维异常清晰。

    **逻辑流程：**
    1. **用户分析（Analyze User）：** 根据提供的日期构建八字排盘（估算），并将其与 MBTI/性格特质结合分析。
    2. **任务分类（Classify Task）：**
       - 如果是“我在拖延 / 我需要开始”的任务：使用 **微步骤（Micro-Steps）**。基于福格模型，降低激活能。例如：“把手机扔远点”，“只打开笔记本盖子”。
       - 如果是“项目 / 论文 / 商业计划”的任务：使用 **战略规划**。利用学习曲线，定义里程碑，并根据八字运势建议最佳时机。
    3. **生成计划（Generate Plan）：** 生成具体的执行步骤。

    **上下文：**
    当前日期：${currentDateString}
  `;

  const userPrompt = `
    **用户档案：**
    - 姓名：${user.name}
    - 性别：${user.gender}
    - 出生日期：${user.birthDate}
    - 出生时间：${user.birthTime}
    - MBTI：${user.mbti}
    - 特质/怪癖：${user.traits}
    - 身高/体重：${user.height || 'N/A'} / ${user.weight || 'N/A'}

    **当前处境 / 任务：**
    "${taskDescription}"

    请剖析我的状态，并告诉我该怎么做。
  `;

  try {
    const result = await ai.models.generateContent({
      model: model,
      contents: systemPrompt + "\n\n" + userPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        thinkingConfig: { thinkingBudget: 2048 } 
      }
    });

    if (result.text) {
      const parsedData = JSON.parse(result.text);
      return {
        taskType: parsedData.taskType as TaskType,
        analysis: {
          userAnalysis: parsedData.userAnalysis,
          baziTiming: parsedData.baziTiming,
          taskClassification: parsedData.taskClassification,
          strategy: parsedData.strategy,
          motivationalQuote: parsedData.motivationalQuote,
        },
        steps: parsedData.steps,
      };
    } else {
      throw new Error("No response content generated");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};