import React, { FC, ReactNode } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { UI } from '../constants/ui';
import { Button } from './Button';

export type ModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  onRequestClose: () => void;
  children?: ReactNode;
};

export const Modal: FC<ModalProps> = ({
  visible,
  title,
  message,
  onRequestClose,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View
        style={[
          styles.backdrop,
          { backgroundColor: `${theme.colors.onBackground}80` },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdropTouchable}
          onPress={onRequestClose}
        />

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.lg,
            },
          ]}
        >
          {title ? (
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                  fontSize: theme.typography.heading.h3.fontSize,
                  fontWeight: theme.typography.heading.h3.fontWeight,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              {title}
            </Text>
          ) : null}

          {message ? (
            <Text
              style={[
                styles.message,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.body.body2.fontSize,
                  lineHeight: theme.typography.body.body2.lineHeight,
                },
                children ? styles.messageWithChildren : styles.messageNoChildren,
              ]}
            >
              {message}
            </Text>
          ) : null}

          {children}
        </View>
      </View>
    </RNModal>
  );
};

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      title={title}
      message={message}
      onRequestClose={onCancel}
    >
      <View style={[styles.actionsRow, { marginTop: theme.spacing.sm }]}>
        <View
          style={[
            styles.action,
            { marginRight: theme.spacing.sm },
          ]}
        >
          <Button title={cancelLabel} onPress={onCancel} variant="secondary" />
        </View>
        <View
          style={[
            styles.action,
            { marginLeft: theme.spacing.sm },
          ]}
        >
          <Button title={confirmLabel} onPress={onConfirm} variant="primary" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: UI.modal.cardWidthPercent,
    borderRadius: UI.modal.cardRadius,
  },
  title: {
    textAlign: 'left',
  },
  actionsRow: {
    flexDirection: 'row',
  },
  message: {
    textAlign: 'left',
  },
  messageWithChildren: {
    marginBottom: UI.spacing.md,
  },
  messageNoChildren: {
    marginBottom: 0,
  },
  action: {
    flex: 1,
  },
});

