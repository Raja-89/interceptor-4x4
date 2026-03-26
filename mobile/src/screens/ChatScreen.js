import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing } from '../theme';
import Icon from '../components/Icon';
import { sendChatMessage } from '../services/chatApi';

export default function ChatScreen() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: 'Hello! I can help you understand your video analysis results. What would you like to know?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [lastAnalysis, setLastAnalysis] = React.useState(null);
  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    loadLastAnalysis();
  }, []);

  const loadLastAnalysis = async () => {
    try {
      const stored = await AsyncStorage.getItem('lastAnalysis');
      if (stored) {
        setLastAnalysis(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading last analysis:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await sendChatMessage(inputText, { lastAnalysis });
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Icon name="cpu" size={24} color={colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>AI Assistant</Text>
            <Text style={styles.subtitle}>Ask about your analysis</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={90}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.isBot ? styles.botBubble : styles.userBubble,
                ]}
              >
                {message.isBot && (
                  <View style={styles.botIcon}>
                    <Icon name="cpu" size={16} color={colors.primary} />
                  </View>
                )}
                <View
                  style={[
                    styles.messageContent,
                    message.isBot ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isBot ? styles.botText : styles.userText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.primary} />
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything..."
              placeholderTextColor={colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              editable={!loading}
            />
            <TouchableOpacity 
              style={[styles.sendButton, loading && styles.sendButtonDisabled]} 
              onPress={sendMessage}
              disabled={loading || !inputText.trim()}
            >
              <Icon name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  messageBubble: {
    marginBottom: spacing.md,
  },
  botBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userBubble: {
    alignItems: 'flex-end',
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  messageContent: {
    maxWidth: '75%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: typography.base,
    lineHeight: typography.lineHeight.normal * typography.base,
  },
  botText: {
    color: colors.textPrimary,
  },
  userText: {
    color: colors.white,
  },
  loadingContainer: {
    alignItems: 'flex-start',
    paddingLeft: 44,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.base,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
