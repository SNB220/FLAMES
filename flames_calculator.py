import re
import time
from typing import Tuple

class FlamesCalculator:
    """A comprehensive FLAMES (Friends, Love, Affection, Marriage, Enemy, Siblings) calculator."""
    
    FLAMES_MEANINGS = {
        'F': ('Friendship', '👫', 'You make great friends!'),
        'L': ('Love', '❤️', 'True love awaits!'),
        'A': ('Affection', '💕', 'Sweet affection between you!'),
        'M': ('Marriage', '💍', 'Wedding bells are ringing!'),
        'E': ('Enemy', '😈', 'Opposites attract... or repel!'),
        'S': ('Siblings', '👩‍👦', 'Like family to each other!')
    }
    
    def __init__(self):
        self.history = []
    
    def validate_name(self, name: str) -> bool:
        """Validate if the name contains only letters and spaces."""
        return bool(re.match(r'^[a-zA-Z\s]+$', name.strip()))
    
    def clean_name(self, name: str) -> str:
        """Clean and normalize the name."""
        return re.sub(r'\s+', '', name.strip().lower())
    
    def calculate_flames(self, name1: str, name2: str) -> Tuple[str, str, str, int]:
        """
        Calculate FLAMES result for two names.
        Returns: (result_letter, meaning, emoji, description, remaining_letters)
        """
        # Validate inputs
        if not self.validate_name(name1) or not self.validate_name(name2):
            raise ValueError("Names should only contain letters and spaces.")
        
        if name1.strip().lower() == name2.strip().lower():
            raise ValueError("Please enter different names.")
        
        # Clean names
        clean_name1 = self.clean_name(name1)
        clean_name2 = self.clean_name(name2)
        
        # Convert to lists for easier manipulation
        name1_list = list(clean_name1)
        name2_list = list(clean_name2)
        
        # Remove common letters
        for i in range(len(name1_list) - 1, -1, -1):
            letter = name1_list[i]
            if letter in name2_list:
                name1_list.pop(i)
                name2_list.remove(letter)
        
        # Calculate remaining letters
        total_letters = len(name1_list) + len(name2_list)
        
        # Handle special case where all letters are common
        if total_letters == 0:
            return 'PERFECT', 'Perfect Match', '💫', 'You\'re meant for each other!', 0
        
        # FLAMES calculation
        flames = ['F', 'L', 'A', 'M', 'E', 'S']
        index = 0
        
        while len(flames) > 1:
            index = (index + total_letters - 1) % len(flames)
            flames.pop(index)
        
        result_letter = flames[0]
        meaning, emoji, description = self.FLAMES_MEANINGS[result_letter]
        
        return result_letter, meaning, emoji, description, total_letters
    
    def add_to_history(self, name1: str, name2: str, result: Tuple[str, str, str, str, int]):
        """Add calculation to history."""
        self.history.append({
            'name1': name1,
            'name2': name2,
            'result': result,
            'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
        })
    
    def show_history(self):
        """Display calculation history."""
        if not self.history:
            print("No calculations in history yet!")
            return
        
        print("\n" + "="*50)
        print("           FLAMES CALCULATION HISTORY")
        print("="*50)
        
        for i, entry in enumerate(self.history, 1):
            result = entry['result']
            print(f"\n{i}. {entry['name1']} ❤️ {entry['name2']}")
            print(f"   Result: {result[2]} {result[1]} - {result[3]}")
            print(f"   Time: {entry['timestamp']}")
    
    def interactive_session(self):
        """Run an interactive FLAMES calculation session."""
        print("🔮" * 25)
        print("     WELCOME TO FLAMES RELATIONSHIP FINDER!")
        print("🔮" * 25)
        print("\nFLAMES stands for:")
        print("F - Friendship 👫 | L - Love ❤️ | A - Affection 💕")
        print("M - Marriage 💍 | E - Enemy 😈 | S - Siblings 👩‍👦")
        print("\nType 'quit' to exit, 'history' to see past calculations\n")
        
        while True:
            try:
                # Get names from user
                name1 = input("Enter the first name: ").strip()
                if name1.lower() == 'quit':
                    print("Thanks for using FLAMES calculator! Goodbye! 👋")
                    break
                elif name1.lower() == 'history':
                    self.show_history()
                    continue
                
                name2 = input("Enter the second name: ").strip()
                if name2.lower() == 'quit':
                    print("Thanks for using FLAMES calculator! Goodbye! 👋")
                    break
                elif name2.lower() == 'history':
                    self.show_history()
                    continue
                
                # Calculate result
                print("\nCalculating... 🔮")
                time.sleep(1)  # Add suspense
                
                result = self.calculate_flames(name1, name2)
                
                # Display result
                print("\n" + "🌟" * 30)
                print(f"   {name1.upper()} ❤️ {name2.upper()}")
                print("🌟" * 30)
                
                if result[0] == 'PERFECT':
                    print(f"\n{result[2]} {result[1]}! {result[3]}")
                else:
                    print(f"\nFLAMES Result: {result[2]} {result[1]}")
                    print(f"Description: {result[3]}")
                    print(f"Remaining letters: {result[4]}")
                
                print("\n" + "🌟" * 30)
                
                # Add to history
                self.add_to_history(name1, name2, result)
                
                # Ask if user wants to continue
                continue_choice = input("\nWould you like to try another pair? (y/n): ").strip().lower()
                if continue_choice not in ['y', 'yes']:
                    print("Thanks for using FLAMES calculator! Goodbye! 👋")
                    break
                    
                print("\n" + "-" * 50 + "\n")
                
            except ValueError as e:
                print(f"❌ Error: {e}")
                print("Please try again with valid names.\n")
            except KeyboardInterrupt:
                print("\n\nThanks for using FLAMES calculator! Goodbye! 👋")
                break
            except Exception as e:
                print(f"❌ An unexpected error occurred: {e}")
                print("Please try again.\n")

def main():
    """Main function to run the FLAMES calculator."""
    calculator = FlamesCalculator()
    calculator.interactive_session()

if __name__ == "__main__":
    main()
