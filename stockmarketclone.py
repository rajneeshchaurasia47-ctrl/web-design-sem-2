import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# -------------------------------------------------------------------------
# STEP 1: Handling & Cleaning Unstructured Data (Simulated Dataset)
# -------------------------------------------------------------------------
# Creating a dummy 'unstructured/messy' dataset for demonstration
raw_data = {
    "Date": [
        "2026-01-01",
        "2026-01-02",
        "2026-01-03",
        "  missing_date  ",
        "2026-01-05",
        "2026-01-06",
        "2026-01-07",
    ],
    "Close_Price": ["150.5", "152.3", "N/A", "155.0", "153.8", "158.2", "160.0"],
    "Volume": [1000, 1200, 1100, 950, np.nan, 1300, 1400],
}

df = pd.DataFrame(raw_data)
print("--- Raw/Messy Data ---")
print(df, "\n")

# Cleaning Process
# 1. Stripping whitespaces and handling invalid dates
df["Date"] = df["Date"].str.strip()
df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

# 2. Converting price to numeric and handling missing values (N/A)
df["Close_Price"] = pd.to_numeric(df["Close_Price"], errors="coerce")

# Dropping rows where critical data (Date or Price) is missing
df.dropna(subset=["Date", "Close_Price"], inplace=True)

# 3. Filling missing Volume data with the median value
df["Volume"] = df["Volume"].fillna(df["Volume"].median())

df.set_index("Date", inplace=True)
print("--- Cleaned Data ---")
print(df, "\n")

# -------------------------------------------------------------------------
# STEP 2: Historical Performance & Returns Calculation
# -------------------------------------------------------------------------
# Calculating Daily Returns using NumPy and Pandas
df["Daily_Return"] = df["Close_Price"].pct_change()
# Filling the first row's NaN return with 0
df["Daily_Return"] = df["Daily_Return"].fillna(0)

# Calculating Cumulative Returns
df["Cumulative_Return"] = (1 + df["Daily_Return"]).cumprod() - 1

print("--- Performance Metrics ---")
print(df[["Close_Price", "Daily_Return", "Cumulative_Return"]], "\n")

# -------------------------------------------------------------------------
# STEP 3: Risk-Reward Scenarios (Volatility & Max Drawdown)
# -------------------------------------------------------------------------
# Reward Indicator: Average Daily Return
avg_return = df["Daily_Return"].mean()

# Risk Indicator: Volatility (Standard Deviation of Daily Returns)
volatility = df["Daily_Return"].std()

# Calculating Sharpe Ratio (assuming Risk-Free Rate = 0 for simplicity)
sharpe_ratio = (
    (avg_return / volatility) * np.sqrt(252) if volatility != 0 else 0
)

print("--- Risk-Reward Analysis ---")
print(f"Average Daily Return (Reward): {avg_return:.4f}")
print(f"Daily Volatility (Risk): {volatility:.4f}")
print(f"Annualized Sharpe Ratio: {sharpe_ratio:.2f}\n")

# -------------------------------------------------------------------------
# STEP 4: Data Visualization (Matplotlib)
# -------------------------------------------------------------------------
plt.figure(figsize=(12, 5))

# Plotting Stock Price Trend
plt.subplot(1, 2, 1)
plt.plot(df.index, df["Close_Price"], marker="o", color="blue", linewidth=2)
plt.title("Historical Stock Performance (Close Price)")
plt.xlabel("Date")
plt.ylabel("Price ($)")
plt.grid(True)
plt.xticks(rotation=45)

# Plotting Cumulative Returns
plt.subplot(1, 2, 2)
plt.plot(
    df.index,
    df["Cumulative_Return"] * 100,
    marker="s",
    color="green",
    linewidth=2,
)
plt.title("Growth of Investment (Cumulative Return %)")
plt.xlabel("Date")
plt.ylabel("Return (%)")
plt.grid(True)
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()